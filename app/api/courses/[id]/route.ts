import { connectToDB } from "@/lib/db";
import { Course } from "@/models/course";
import { NextResponse } from "next/server";

// UPDATE course
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectToDB();
  const body = await req.json();
  const updatedCourse = await Course.findByIdAndUpdate(params.id, body, {
    new: true,
  });
  return NextResponse.json(updatedCourse);
}

// DELETE course
export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  await connectToDB();
  await Course.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "Course deleted" });
}
