import { NextResponse } from "next/server";
import crypto from "crypto";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import User from "@/models/User";
import { sendEmail } from "@/lib/sendEmail";

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
const user = await User.findById(order.userId);

if (user?.email) {
  await sendEmail(
    user.email,
    "Payment Successful ✅",
    `
      <div style="font-family:Arial,sans-serif;padding:20px">
        <h2>🎮 Gaming Thumbnail Marketplace</h2>

        <p>Hello <b>${user.name}</b>,</p>

        <p>Your payment has been received successfully.</p>

        <hr/>

        <p><b>Template:</b> ${order.templateName}</p>
        <p><b>Amount:</b> ₹${order.price}</p>
        <p><b>Status:</b> Paid ✅</p>

        <hr/>

        <p>
          Your order is now being processed.
          You'll receive another email when your thumbnail is completed.
        </p>

        <br/>

        <h3>Thank you for your purchase ❤️</h3>
      </div>
    `
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