import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import User from "@/models/User";
import { sendEmail } from "@/lib/sendEmail";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;
    const body = await req.json();

    const order = await Order.findByIdAndUpdate(
      id,
      {
        completedThumbnail: body.completedThumbnail,
        adminNote: body.adminNote,
        status: "Completed",
        downloadUnlocked: true,
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
      try {
        await sendEmail(
          user.email,
          "🎉 Your Thumbnail is Ready!",
          `
          <div style="font-family:Arial,sans-serif;padding:20px">
            <h2>🎮 Gaming Thumbnail Marketplace</h2>

            <p>Hello <b>${user.name}</b>,</p>

            <p>Your thumbnail has been completed successfully.</p>

            <hr/>

            <p><b>Template:</b> ${order.templateName}</p>

            <p>
              Your order has been completed.
              You can now download your thumbnail from your dashboard.
            </p>

            <a
              href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard"
              style="
                background:#06b6d4;
                color:white;
                padding:12px 24px;
                border-radius:8px;
                text-decoration:none;
                display:inline-block;
                margin-top:20px;
              "
            >
              📥 Download Thumbnail
            </a>

            <br/><br/>

            <p>Thank you for choosing Gaming Thumbnail Marketplace ❤️</p>
          </div>
          `
        );

        console.log("✅ Thumbnail Ready Email Sent");
      } catch (err) {
        console.error("❌ Email Error:", err);
      }
    }

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