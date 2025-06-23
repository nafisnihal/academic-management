"use client";

import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

export default function AddStudentForm() {
  const [form, setForm] = useState({ name: "", email: "", gpa: "" });
  const queryClient = useQueryClient();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await axios.post("/api/students", { ...form, gpa: parseFloat(form.gpa) });
    queryClient.invalidateQueries({ queryKey: ["students"] });
    setForm({ name: "", email: "", gpa: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        id="name"
        type="text"
        className="border p-2 w-full"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        id="email"
        type="email"
        className="border p-2 w-full"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        id="gpa"
        type="number"
        className="border p-2 w-full"
        placeholder="GPA"
        value={form.gpa}
        onChange={(e) => setForm({ ...form, gpa: e.target.value })}
      />
      <button type="submit" className="bg-black text-white px-4 py-2 rounded">
        Add Student
      </button>
    </form>
  );
}
