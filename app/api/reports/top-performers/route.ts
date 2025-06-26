import { connectToDB } from "@/lib/db";
import { Student } from "@/models/student";
import { Course } from "@/models/course";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

interface EnrolledCourse {
  courseId: Types.ObjectId | string;
  grade?: number;
  progress?: string;
  enrolledAt?: Date;
}

interface StudentDoc {
  _id: Types.ObjectId | string;
  name: string;
  enrolledCourses: EnrolledCourse[];
}

interface CourseDoc {
  _id: Types.ObjectId | string;
  name: string;
}

interface Performer {
  studentId: string;
  studentName: string;
  courseId: string;
  courseName: string;
  grade: number;
}

export async function GET() {
  try {
    await connectToDB();

    const students = (await Student.find(
      {},
      { name: 1, enrolledCourses: 1 }
    ).lean()) as unknown as StudentDoc[];

    const courses = (await Course.find({}, { _id: 1, name: 1 }).lean()) as unknown as CourseDoc[];

    const courseMap = courses.reduce<Record<string, string>>((acc, course) => {
      const courseId =
        typeof course._id === "string" ? course._id : course._id.toString();
      acc[courseId] = course.name;
      return acc;
    }, {});

    const topPerformers: Record<string, Performer> = {};

    students.forEach((student) => {
      student.enrolledCourses?.forEach((course) => {
        const cId =
          typeof course.courseId === "string"
            ? course.courseId
            : course.courseId.toString();

        const currentTop = topPerformers[cId];

        if (
          !currentTop ||
          (typeof course.grade === "number" && course.grade > currentTop.grade)
        ) {
          topPerformers[cId] = {
            studentId:
              typeof student._id === "string"
                ? student._id
                : student._id.toString(),
            studentName: student.name,
            courseId: cId,
            courseName: courseMap[cId] || "Unknown",
            grade: course.grade ?? 0,
          };
        }
      });
    });

    return NextResponse.json(Object.values(topPerformers));
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to fetch top performers",
        message: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
