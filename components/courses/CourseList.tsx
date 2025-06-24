"use client";

import { useDeleteCourse, useUpdateCourse } from "@/hooks/useCourseMutations";
import { useCourses } from "@/hooks/useCourses";
import { useState } from "react";

export default function CourseList() {
  const { data, isLoading, error, refetch } = useCourses();
  const { mutate: deleteCourse } = useDeleteCourse();
  const { mutate: updateCourse } = useUpdateCourse();

  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", code: "" });

  const handleEdit = (course: any) => {
    setEditId(course._id);
    setForm({ name: course.name, code: course.code });
  };

  const handleUpdate = () => {
    updateCourse({ id: editId!, data: form });
    setEditId(null);
    setForm({ name: "", code: "" });
    refetch();
  };

  if (isLoading) return <div>Loading courses...</div>;
  if (error) return <div>Error loading courses</div>;

  return (
    <div className="space-y-4">
      {data.map((course: any) => (
        <div key={course._id} className="border p-4 rounded">
          {editId === course._id ? (
            <div className="space-y-2">
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="border p-2 w-full"
              />
              <input
                value={form.code}
                onChange={(e) => setForm({ ...form, code: e.target.value })}
                className="border p-2 w-full"
              />
              <button
                onClick={handleUpdate}
                className="bg-blue-600 text-white px-3 py-1 rounded"
              >
                Save
              </button>
            </div>
          ) : (
            <>
              <h2 className="font-bold text-lg">{course.name}</h2>
              <p>Code: {course.code}</p>
              <p>Total Enrolled: {course.enrolledStudentIds?.length || 0}</p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleEdit(course)}
                  className="text-sm px-2 py-1 bg-yellow-500 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteCourse(course._id)}
                  className="text-sm px-2 py-1 bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
