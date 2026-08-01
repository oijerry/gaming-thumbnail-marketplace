import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Coupon from "@/models/Coupon";

export async function GET() {
  try {
    await connectDB();

    const coupons = await Coupon.find().sort({
      createdAt: -1,
    });

    return NextResponse.json({
      success: true,
      coupons,
    });
  } catch (error: any) {
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

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    const exists = await Coupon.findOne({
      code: body.code.toUpperCase(),
    });

    if (exists) {
      return NextResponse.json({
        success: false,
        message: "Coupon already exists",
      });
    }

    const coupon = await Coupon.create({
      code: body.code.toUpperCase(),
      discount: body.discount,
      expiresAt: body.expiresAt,
      active: true,
    });

    return NextResponse.json({
      success: true,
      coupon,
    });
  } catch (error: any) {
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