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

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    if (!body.code || !body.discount || !body.expiresAt) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required.",
        },
        {
          status: 400,
        }
      );
    }

    if (body.discount <= 0 || body.discount > 100) {
      return NextResponse.json(
        {
          success: false,
          message: "Discount must be between 1 and 100.",
        },
        {
          status: 400,
        }
      );
    }

    const exists = await Coupon.findOne({
      code: body.code.toUpperCase(),
    });

    if (exists) {
      return NextResponse.json(
        {
          success: false,
          message: "Coupon already exists.",
        },
        {
          status: 400,
        }
      );
    }

    const coupon = await Coupon.create({
      code: body.code.toUpperCase(),
      discount: body.discount,
      expiresAt: new Date(body.expiresAt),
      active: true,
    });

    return NextResponse.json({
      success: true,
      message: "Coupon created successfully.",
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