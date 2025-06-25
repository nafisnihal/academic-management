import { connectToDB } from "@/lib/db";
import { Faculty } from "@/models/faculty";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectToDB();
  const body = await req.json();
  const updated = await Faculty.findByIdAndUpdate(params.id, body, {
    new: true,
  });
  return NextResponse.json(updated);
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  await connectToDB();
  await Faculty.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
}
