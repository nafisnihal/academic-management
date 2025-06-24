import { connectToDB } from "@/lib/db";
import { Course } from "@/models/course";
import { Student } from "@/models/student";

interface Props {
  params: { id: string };
}

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

interface CourseInfo {
  courseName: string;
  courseCode: string;
  grade?: number;
  progress?: string;
}

export default async function StudentProfile({ params }: Props) {
  await connectToDB();

  const student = await Student.findById(params.id).lean<StudentType>();
  if (!student) return <div>Student not found</div>;

  const enrolledDetails: CourseInfo[] = await Promise.all(
    student.enrolledCourses.map(async (enrolled) => {
      const course = await Course.findById(enrolled.courseId).lean<{
        name?: string;
        code?: string;
      }>();
      return {
        courseName: course?.name || "Unknown",
        courseCode: course?.code || "",
        grade: enrolled.grade,
        progress: enrolled.progress,
      };
    })
  );

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Student Profile</h1>

      <div className="bg-white rounded shadow p-4 space-y-2">
        <p>
          <strong>Name:</strong> {student.name}
        </p>
        <p>
          <strong>Email:</strong> {student.email}
        </p>
        <p>
          <strong>GPA:</strong> {student.gpa ?? "N/A"}
        </p>
      </div>

      <h2 className="text-xl font-semibold mt-6">Enrolled Courses</h2>
      {enrolledDetails.length === 0 ? (
        <p className="text-gray-500">No courses enrolled</p>
      ) : (
        <div className="space-y-3">
          {enrolledDetails.map((course, idx) => (
            <div key={idx} className="bg-gray-50 border p-4 rounded space-y-1">
              <p>
                <strong>{course.courseName}</strong> ({course.courseCode})
              </p>
              <p>
                <strong>Grade:</strong> {course.grade ?? "N/A"}
              </p>
              <p>
                <strong>Progress:</strong> {course.progress || "N/A"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
