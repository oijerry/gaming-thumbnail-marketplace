import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Template from "@/models/Template";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    await Template.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Template Deleted Successfully",
    });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}