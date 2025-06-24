"use client";

import { useCourses } from "@/hooks/useCourses";
import { useAssignCourseToStudent } from "@/hooks/useStudentCourseMutations";
import { useStudents } from "@/hooks/useStudents";
import { useState } from "react";

export default function FacultyPanel() {
  const { data: students } = useStudents();
  const { data: courses } = useCourses();
  const { mutate } = useAssignCourseToStudent();

  const [studentId, setStudentId] = useState("");
  const [courseId, setCourseId] = useState("");
  const [grade, setGrade] = useState("");
  const [progress, setProgress] = useState("");

  const handleAssign = () => {
    if (!studentId || !courseId) return;
    mutate({
      studentId,
      courseId,
      grade: grade ? parseFloat(grade) : undefined,
      progress,
    });

    // reset
    setStudentId("");
    setCourseId("");
    setGrade("");
    setProgress("");
  };

  return (
    <div className="space-y-4 border p-6 rounded">
      <h2 className="text-xl font-semibold">Faculty Panel</h2>

      <select
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
        className="border p-2 w-full"
      >
        <option value="">Select Student</option>
        {students?.map((s: any) => (
          <option key={s._id} value={s._id}>
            {s.name} ({s.email})
          </option>
        ))}
      </select>

      <select
        value={courseId}
        onChange={(e) => setCourseId(e.target.value)}
        className="border p-2 w-full"
      >
        <option value="">Select Course</option>
        {courses?.map((c: any) => (
          <option key={c._id} value={c._id}>
            {c.name}
          </option>
        ))}
      </select>

      <input
        placeholder="Grade (optional)"
        value={grade}
        onChange={(e) => setGrade(e.target.value)}
        className="border p-2 w-full"
      />

      <input
        placeholder="Progress summary (optional)"
        value={progress}
        onChange={(e) => setProgress(e.target.value)}
        className="border p-2 w-full"
      />

      <button
        onClick={handleAssign}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Assign/Update
      </button>
    </div>
  );
}
