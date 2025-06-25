import { connectToDB } from "@/lib/db";
import { Student } from "@/models/student";
import { Course } from "@/models/course";
import { Faculty } from "@/models/faculty";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDB();

  const [students, courses, faculties] = await Promise.all([
    Student.find().lean(),
    Course.find().lean(),
    Faculty.find().lean(),
  ]);

  const topStudents = [...students]
    .filter((s) => typeof s.gpa === "number")
    .sort((a, b) => b.gpa - a.gpa)
    .slice(0, 5);

  const courseEnrollments = courses.map((course) => ({
    name: course.name,
    count: course.enrolledStudentIds?.length || 0,
  }));

  return NextResponse.json({
    totalStudents: students.length,
    totalCourses: courses.length,
    totalFaculties: faculties.length,
    topStudents,
    courseEnrollments,
  });
}
