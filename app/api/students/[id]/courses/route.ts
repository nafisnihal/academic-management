import { connectToDB } from "@/lib/db";
import { Course } from "@/models/course";
import { Student } from "@/models/student";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectToDB();
  const body = await req.json(); // { courseId, grade, progress }

  const student = await Student.findById(params.id);
  if (!student) {
    return NextResponse.json({ error: "Student not found" }, { status: 404 });
  }

  const alreadyEnrolled = student.enrolledCourses.find(
    (c: any) => c.courseId === body.courseId
  );

  // If already assigned, return an error
  if (alreadyEnrolled) {
    return NextResponse.json(
      { error: "Student is already enrolled in this course." },
      { status: 400 }
    );
  }

  // Otherwise, assign the course
  student.enrolledCourses.push({
    courseId: body.courseId,
    grade: body.grade,
    progress: body.progress,
  });

  await student.save();

  // Also update course's enrolledStudentIds
  const course = await Course.findById(body.courseId);
  if (!course.enrolledStudentIds.includes(student._id.toString())) {
    course.enrolledStudentIds.push(student._id.toString());
    await course.save();
  }

  return NextResponse.json(student);
}
