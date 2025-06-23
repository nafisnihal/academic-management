import { connectToDB } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDB();
    return NextResponse.json({ message: "Connected to MongoDB!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Connection failed" }, { status: 500 });
  }
}
