import { NextResponse } from "next/server";
import crypto from "crypto";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const {
      orderId, // MongoDB Order _id

      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = body;

    const generatedSignature = crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_KEY_SECRET!
      )
      .update(
        `${razorpay_order_id}|${razorpay_payment_id}`
      )
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Signature",
        },
        {
          status: 400,
        }
      );
    }

    const order = await Order.findByIdAndUpdate(
  orderId,
  {
    paymentStatus: "Paid",

    status: "Completed",

    downloadUnlocked: true,

    razorpayOrderId: razorpay_order_id,

    razorpayPaymentId: razorpay_payment_id,

    razorpaySignature: razorpay_signature,
  },
  {
    new: true,
  }
);
    if (!order) {
  return NextResponse.json(
    {
      success: false,
      message: "Order not found",
    },
    {
      status: 404,
    }
  );
}

    return NextResponse.json({
      success: true,
      order,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Verification Failed",
      },
      {
        status: 500,
      }
    );
  }
}