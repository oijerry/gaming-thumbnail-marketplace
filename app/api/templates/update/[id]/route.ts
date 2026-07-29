import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Template from "@/models/Template";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(
  req: Request,
  { params }: Props
) {
  try {
    await connectDB();

    const { id } = await params;

    const body = await req.json();

    const updatedTemplate =
      await Template.findByIdAndUpdate(
        id,
        body,
        {
          new: true,
        }
      );

    if (!updatedTemplate) {
      return NextResponse.json(
        {
          success: false,
          message: "Template not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      template: updatedTemplate,
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