import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Please login first.",
        },
        {
          status: 401,
        }
      );
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as {
      id: string;
    };

    const body = await req.json();

    const order = await Order.create({
      userId: decoded.id,

      templateId: body.templateId,

      customerName: body.customerName,

      customerEmail: body.customerEmail,

      templateName: body.templateName,

      price: body.price,

      paymentStatus: "Unpaid",

      status: "Pending",

      downloadUnlocked: false,

      razorpayOrderId: "",

      razorpayPaymentId: "",

      razorpaySignature: "",
    });

    return NextResponse.json({
      success: true,
      order,
    });

  } catch (error: any) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}