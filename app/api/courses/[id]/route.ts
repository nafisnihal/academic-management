import { connectToDB } from "@/lib/db";
import { Course } from "@/models/course";
import { NextRequest, NextResponse } from "next/server";

// UPDATE course
export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    await connectToDB();
    const body = await req.json();
    const updatedCourse = await Course.findByIdAndUpdate(
      context.params.id,
      body,
      { new: true }
    );
    return NextResponse.json(updatedCourse);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update course", error },
      { status: 500 }
    );
  }
}

// DELETE course
export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    await connectToDB();
    await Course.findByIdAndDelete(context.params.id);
    return NextResponse.json({ message: "Course deleted" });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete course", error },
      { status: 500 }
    );
  }
}
