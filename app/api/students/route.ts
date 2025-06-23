import { connectToDB } from "@/lib/db";
import { Student } from "@/models/student";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDB();
  const students = await Student.find();
  return NextResponse.json(students);
}

export async function POST(req: Request) {
  const body = await req.json();
  await connectToDB();
  const newStudent = await Student.create(body);
  return NextResponse.json(newStudent);
}
