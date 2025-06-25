import { connectToDB } from "@/lib/db";
import { Faculty } from "@/models/faculty";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDB();
  const faculties = await Faculty.find().lean();
  return NextResponse.json(faculties);
}

export async function POST(req: Request) {
  await connectToDB();
  const body = await req.json(); // { name, email }
  const created = await Faculty.create(body);
  return NextResponse.json(created);
}
