import { connectToDB } from "@/lib/db";
import { Course } from "@/models/course";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDB();
  const courses = await Course.find();
  return NextResponse.json(courses);
}

export async function POST(req: Request) {
  const body = await req.json();
  await connectToDB();
  const newCourse = await Course.create(body);
  return NextResponse.json(newCourse);
}
