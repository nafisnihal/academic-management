"use client";

import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

export default function AddCourseForm() {
  const [form, setForm] = useState({ name: "", code: "" });
  const queryClient = useQueryClient();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await axios.post("/api/courses", form);
    queryClient.invalidateQueries({ queryKey: ["courses"] });
    setForm({ name: "", code: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        id="courseName"
        type="text"
        placeholder="Course Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="border p-2 w-full"
      />
      <input
        id="courseCode"
        type="text"
        placeholder="Course Code"
        value={form.code}
        onChange={(e) => setForm({ ...form, code: e.target.value })}
        className="border p-2 w-full"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Add Course
      </button>
    </form>
  );
}
