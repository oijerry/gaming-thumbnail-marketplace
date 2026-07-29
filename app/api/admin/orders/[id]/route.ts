import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";

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
      },
      {
        new: true,
      }
    );

    return NextResponse.json({
      success: true,
      order,
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