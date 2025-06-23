"use client";

import { useStudents } from "@/hooks/useStudents";

export default function StudentList() {
  const { data, isLoading, error } = useStudents();

  if (isLoading) return <div>Loading students...</div>;
  if (error) return <div>Error loading students</div>;

  return (
    <div className="space-y-2">
      {data.map((student: any) => (
        <div key={student._id} className="border p-4 rounded-lg">
          <p>
            <strong>{student.name}</strong>
          </p>
          <p>Email: {student.email}</p>
          <p>GPA: {student.gpa}</p>
        </div>
      ))}
    </div>
  );
}
