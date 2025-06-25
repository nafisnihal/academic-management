"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useStudentProfile } from "@/hooks/useStudentProfile";
import { useParams } from "next/navigation";

interface EnrolledCourse {
  courseName: string;
  courseCode: string;
  grade?: string | null;
  progress?: string | null;
}


export default function StudentProfilePage() {
  const { id } = useParams() as { id: string };
  const { data, isLoading, error } = useStudentProfile(id);

  if (isLoading) return <Skeleton className="h-40 max-w-3xl mx-auto mt-9" />;
  if (error || !data)
    return <p className="text-red-600">Failed to load student.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Student Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p>
            <strong>Name:</strong> {data.name}
          </p>
          <p>
            <strong>Email:</strong> {data.email}
          </p>
          <p>
            <strong>GPA:</strong> {data.gpa ?? "N/A"}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Enrolled Courses</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
            {data.enrolledCourses?.length === 0 ? (
            <p>No courses enrolled.</p>
            ) : (
            data.enrolledCourses.map((course: EnrolledCourse, idx: number) => (
              <div key={idx} className="border rounded p-3 space-y-1">
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
            ))
            )}
        </CardContent>
      </Card>
    </div>
  );
}
