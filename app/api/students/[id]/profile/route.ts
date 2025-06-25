import { connectToDB } from "@/lib/db";
import { Course } from "@/models/course";
import { Student } from "@/models/student";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

interface EnrolledCourse {
  courseId: string;
  grade?: number;
  progress?: string;
}

interface StudentType {
  _id: string;
  name: string;
  email: string;
  gpa?: number;
  enrolledCourses: EnrolledCourse[];
}

interface CourseType {
  _id: string;
  name?: string;
  code?: string;
}

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    await connectToDB();

    const studentResult = await Student.findById(
      context.params.id
    ).lean<StudentType | null>();
    const student = Array.isArray(studentResult)
      ? studentResult[0]
      : studentResult;

    if (!student) {
      return NextResponse.json(
        { message: "Student not found" },
        { status: 404 }
      );
    }

    // Make sure enrolledCourses exists and is properly typed
    const enrolledCourses = student.enrolledCourses ?? [];

    const enrolledDetails = await Promise.all(
      enrolledCourses.map(async (enrolled: EnrolledCourse) => {
        const courseResult = await Course.findById(
          enrolled.courseId
        ).lean<CourseType | null>();
        const course = Array.isArray(courseResult)
          ? courseResult[0]
          : courseResult;

        return {
          courseName: course?.name || "Unknown",
          courseCode: course?.code || "",
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
