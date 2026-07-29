import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Template from "@/models/Template";

export async function GET() {
  try {
    await connectDB();

    const templates = await Template.find().sort({
      createdAt: -1,
    });

    return NextResponse.json({
      success: true,
      templates,
    });
  } catch (error: unknown) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    if (
      !body.title ||
      !body.image ||
      !body.category ||
      body.price === undefined
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields",
        },
        {
          status: 400,
        }
      );
    }

    const template = await Template.create({
      title: body.title,
      image: body.image,
      category: body.category,
      description: body.description || "",
      badge: body.badge || "",
      price: Number(body.price),
      rating: Number(body.rating || 5),
      downloads: Number(body.downloads || 0),

      // New fields
      downloadZip: body.downloadZip || "",
      downloadPsd: body.downloadPsd || "",
    });

    return NextResponse.json({
      success: true,
      template,
    });

  } catch (error: unknown) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}