import { connectToDB } from "@/lib/db";
import { Course } from "@/models/course";
import { Student } from "@/models/student";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

interface AssignCourseBody {
  courseId: string;
  grade?: number;
  progress?: string;
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectToDB();
  const body: AssignCourseBody = await req.json();

  const student = await Student.findById(params.id);
  if (!student) {
    return NextResponse.json({ error: "Student not found" }, { status: 404 });
  }

  interface EnrolledCourse {
    courseId: string;
    grade?: number;
    progress?: string;
    enrolledAt?: Date;
  }

  const alreadyEnrolled: EnrolledCourse | undefined =
    student.enrolledCourses.find(
      (c: EnrolledCourse) => c.courseId === body.courseId
    );

  if (alreadyEnrolled) {
    return NextResponse.json(
      { error: "Student is already enrolled in this course." },
      { status: 400 }
    );
  }

  // Assign the course with enrollment timestamp
  student.enrolledCourses.push({
    courseId: new Types.ObjectId(body.courseId),
    grade: body.grade,
    progress: body.progress,
    enrolledAt: new Date(),
  });

  await student.save();

  // Also update course document
  const course = await Course.findById(body.courseId);
  if (!course) {
    return NextResponse.json({ error: "Course not found" }, { status: 404 });
  }

  if (!course.enrolledStudentIds.includes(student._id.toString())) {
    course.enrolledStudentIds.push(student._id.toString());
    await course.save();
  }

  return NextResponse.json(student);
}
