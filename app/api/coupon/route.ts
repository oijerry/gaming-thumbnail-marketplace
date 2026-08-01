import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Coupon from "@/models/Coupon";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { code, amount } = await req.json();

    const coupon = await Coupon.findOne({
      code: code.toUpperCase(),
      active: true,
    });

    if (!coupon) {
      return NextResponse.json({
        success: false,
        message: "Invalid Coupon Code",
      });
    }

    if (new Date(coupon.expiresAt) < new Date()) {
      return NextResponse.json({
        success: false,
        message: "Coupon Expired",
      });
    }

    const discount = Math.round(
      (amount * coupon.discount) / 100
    );

    return NextResponse.json({
      success: true,
      discount,
      finalAmount: amount - discount,
      coupon,
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