import { connectToDB } from "@/lib/db";
import { Course } from "@/models/course";
import { Student } from "@/models/student";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    await connectToDB();

    const studentResult = await Student.findById(context.params.id).lean();
    const student = Array.isArray(studentResult)
      ? studentResult[0]
      : studentResult;
    if (!student) {
      return NextResponse.json(
        { message: "Student not found" },
        { status: 404 }
      );
    }

    // Ensure student has enrolledCourses property
    const enrolledCourses = (student as any).enrolledCourses || [];
    const enrolledDetails = await Promise.all(
      enrolledCourses.map(async (enrolled: any) => {
        const course = await Course.findById(enrolled.courseId).lean();
        const courseObj = Array.isArray(course) ? course[0] : course;
        return {
          courseName: courseObj?.name || "Unknown",
          courseCode: courseObj?.code || "",
          grade: enrolled.grade,
          progress: enrolled.progress,
        };
      })
    );

    return NextResponse.json({
      _id: student._id,
      name: student.name,
      email: student.email,
      gpa: student.gpa,
      enrolledCourses: enrolledDetails,
    });
  } catch (err) {
    return NextResponse.json(
      { message: "Server error", error: (err as Error).message },
      { status: 500 }
    );
  }
}
