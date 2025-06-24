"use client";

import {
  useDeleteStudent,
  useUpdateStudent,
} from "@/hooks/useStudentMutations";
import { useStudents } from "@/hooks/useStudents";
import Link from "next/link";
import { useState } from "react";

export default function StudentList() {
  const { data, isLoading, error, refetch } = useStudents();
  const { mutate: deleteStudent } = useDeleteStudent();
  const { mutate: updateStudent } = useUpdateStudent();
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", gpa: "" });

  const handleEdit = (student: any) => {
    setEditId(student._id);
    setForm({
      name: student.name,
      email: student.email,
      gpa: student.gpa.toString(),
    });
  };

  const handleUpdate = () => {
    updateStudent({
      id: editId!,
      data: { ...form, gpa: parseFloat(form.gpa) },
    });
    setEditId(null);
    setForm({ name: "", email: "", gpa: "" });
    refetch();
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading students</div>;

  return (
    <div className="space-y-4">
      {data.map((student: any) => (
        <div key={student._id} className="border p-4 rounded">
          {editId === student._id ? (
            <div className="space-y-2">
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="border p-1 w-full"
              />
              <input
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="border p-1 w-full"
              />
              <input
                value={form.gpa}
                onChange={(e) => setForm({ ...form, gpa: e.target.value })}
                className="border p-1 w-full"
              />
              <button
                onClick={handleUpdate}
                className="bg-blue-600 text-white px-3 py-1 rounded"
              >
                Save
              </button>
            </div>
          ) : (
            <div>
              <p>
                <strong>{student.name}</strong>
              </p>
              <p>Email: {student.email}</p>
              <p>GPA: {student.gpa}</p>
              <Link
                href={`/students/${student._id}`}
                className="text-blue-600 underline text-sm"
              >
                View Profile
              </Link>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleEdit(student)}
                  className="text-sm px-2 py-1 bg-yellow-500 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteStudent(student._id)}
                  className="text-sm px-2 py-1 bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
