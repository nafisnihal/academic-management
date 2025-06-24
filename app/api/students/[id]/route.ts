import { connectToDB } from "@/lib/db";
import { Student } from "@/models/student";
import { NextResponse } from "next/server";

// UPDATE student
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectToDB();
  const body = await req.json();
  const updatedStudent = await Student.findByIdAndUpdate(params.id, body, {
    new: true,
  });
  return NextResponse.json(updatedStudent);
}

// DELETE student
export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  await connectToDB();
  await Student.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "Student deleted" });
}
