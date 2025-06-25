import { connectToDB } from "@/lib/db";
import { Course } from "@/models/course";
import { Faculty } from "@/models/faculty";
import { NextResponse } from "next/server";

// GET: Get all courses with faculty name populated
export async function GET() {
  await connectToDB();

  const courses = await Course.find().lean();

  const coursesWithFaculty = await Promise.all(
    courses.map(async (course) => {
      const faculty = course.facultyId
        ? await Faculty.findById(course.facultyId).lean()
        : null;

      return {
        ...course,
        facultyName:
          faculty && !Array.isArray(faculty) && faculty.name
            ? faculty.name
            : "Not Assigned",
      };
    })
  );

  return NextResponse.json(coursesWithFaculty);
}

// POST: Create a new course
export async function POST(req: Request) {
  await connectToDB();
  const body = await req.json();

  const newCourse = await Course.create(body);
  return NextResponse.json(newCourse);
}
