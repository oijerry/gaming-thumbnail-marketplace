import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    await connectDB();

    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Please login first",
        },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as {
      id: string;
    };

    const { orderId } = await params;

    const order = await Order.findById(orderId);

    if (!order) {
      return NextResponse.json(
        {
          success: false,
          message: "Order not found",
        },
        { status: 404 }
      );
    }

    if (order.userId.toString() !== decoded.id) {
      return NextResponse.json(
        {
          success: false,
          message: "Access denied",
        },
        { status: 403 }
      );
    }

    if (order.paymentStatus !== "Paid") {
      return NextResponse.json(
        {
          success: false,
          message: "Payment Required",
        },
        { status: 403 }
      );
    }

    if (!order.completedThumbnail) {
      return NextResponse.json(
        {
          success: false,
          message: "Thumbnail not ready yet",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      downloadUrl: order.completedThumbnail,
    });

  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}