import { connectToDB } from "@/lib/db";
import { Course } from "@/models/course";
import { Student } from "@/models/student";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

interface EnrollmentEntry {
  courseId: Types.ObjectId | string;
  enrolledAt: Date;
  grade?: number;
  progress?: string;
}

interface StudentDoc {
  _id: string;
  name: string;
  email: string;
  gpa: number;
  enrolledCourses: EnrollmentEntry[];
}

interface EnrollmentCount {
  courseId: string;
  courseName: string;
  month: string;
  year: number;
  count: number;
}

export async function GET() {
  try {
    await connectToDB();

    const students = (await Student.find(
      {},
      { name: 1, email: 1, gpa: 1, enrolledCourses: 1 }
    ).lean()) as unknown as StudentDoc[];

    const countMap: Record<string, EnrollmentCount> = {};

    for (const student of students) {
      for (const enrolled of student.enrolledCourses || []) {
        const courseId =
          typeof enrolled.courseId === "string"
            ? enrolled.courseId
            : enrolled.courseId.toString();

        const date = new Date(enrolled.enrolledAt);
        if (!courseId || isNaN(date.getTime())) continue;

        const monthName = date.toLocaleString("default", { month: "long" });
        const year = date.getFullYear();
        const key = `${courseId}-${year}-${monthName}`;

        if (!countMap[key]) {
          const course = (await Course.findById(courseId).lean()) as {
            name?: string;
          } | null;
          countMap[key] = {
            courseId,
            courseName: course?.name || "Unknown",
            month: monthName,
            year,
            count: 1,
          };
        } else {
          countMap[key].count += 1;
        }
      }
    }

    return NextResponse.json(Object.values(countMap));
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to generate enrollment report",
        message: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
