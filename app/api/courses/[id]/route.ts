import { connectToDB } from "@/lib/db";
import { Course } from "@/models/course";
import { NextRequest, NextResponse } from "next/server";

// Define expected params type
interface Params {
  params: {
    id: string;
  };
}

// UPDATE course
export async function PUT(req: NextRequest, { params }: Params) {
  await connectToDB();

  try {
    const body = await req.json();
    const updatedCourse = await Course.findByIdAndUpdate(params.id, body, {
      new: true,
    });

    if (!updatedCourse) {
      return NextResponse.json(
        { message: "Course not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedCourse);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update course", error: (error as Error).message },
      { status: 500 }
    );
  }
}

// DELETE course
export async function DELETE(_req: NextRequest, { params }: Params) {
  await connectToDB();

  try {
    const deleted = await Course.findByIdAndDelete(params.id);

    if (!deleted) {
      return NextResponse.json(
        { message: "Course not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Course deleted" });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete course", error: (error as Error).message },
      { status: 500 }
    );
  }
}
