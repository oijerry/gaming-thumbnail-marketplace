import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Wishlist from "@/models/Wishlist";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as { id: string };

    const wishlist = await Wishlist.find({
      userId: decoded.id,
    }).populate("templateId");

    return NextResponse.json({
      success: true,
      wishlist,
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

    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as { id: string };

    const { templateId } = await req.json();

    const existing = await Wishlist.findOne({
      userId: decoded.id,
      templateId,
    });

    if (existing) {
      return NextResponse.json({
        success: false,
        message: "Already in wishlist",
      });
    }

    await Wishlist.create({
      userId: decoded.id,
      templateId,
    });

    return NextResponse.json({
      success: true,
      message: "Added to wishlist ❤️",
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