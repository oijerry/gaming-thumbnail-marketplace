import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Review from "@/models/Review";
import jwt from "jsonwebtoken";

export async function GET() {
  try {
    await connectDB();

    const reviews = await Review.find()
      .populate("userId", "name")
      .populate("templateId", "title")
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      reviews,
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
        {
          success: false,
          message: "Please Login",
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

    const alreadyReviewed = await Review.findOne({
      userId: decoded.id,
      templateId: body.templateId,
    });

    if (alreadyReviewed) {
      return NextResponse.json(
        {
          success: false,
          message: "You already reviewed this template.",
        },
        {
          status: 400,
        }
      );
    }

    const review = await Review.create({
      userId: decoded.id,
      templateId: body.templateId,
      rating: body.rating,
      comment: body.comment,
    });

    return NextResponse.json({
      success: true,
      review,
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