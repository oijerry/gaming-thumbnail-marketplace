import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Template from "@/models/Template";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const search = req.nextUrl.searchParams.get("search") || "";
    const category = req.nextUrl.searchParams.get("category") || "";

    const query: any = {};

    if (search) {
      query.title = {
        $regex: search,
        $options: "i",
      };
    }

    if (category && category !== "All") {
      query.category = category;
    }

    const templates = await Template.find(query).sort({
      createdAt: -1,
    });

    return NextResponse.json({
      success: true,
      templates,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}