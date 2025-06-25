"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCourses } from "@/hooks/useCourseMutations";
import { useAssignCourseToStudent } from "@/hooks/useStudentCourseMutations";
import { useStudents } from "@/hooks/useStudentMutations";
import { useState } from "react";
import { toast } from "sonner";

interface Student {
  _id: string;
  name: string;
  email: string;
  gpa?: number;
  courses?: {
    courseId: string;
    grade?: number;
    progress?: string;
  }[];
}

interface Course {
  _id: string;
  name: string;
}

export default function FacultyPanel() {
  const { data: students = [] } = useStudents();
  const { data: courses = [] } = useCourses();
  const { mutate } = useAssignCourseToStudent();

  const [studentId, setStudentId] = useState("");
  const [courseId, setCourseId] = useState("");
  const [grade, setGrade] = useState("");
  const [progress, setProgress] = useState("");

  const handleAssign = () => {
    if (!studentId || !courseId) {
      toast.error("Please select both student and course.");
      return;
    }

    mutate(
      {
        studentId,
        courseId,
        grade: grade ? parseFloat(grade) : undefined,
        progress,
      },
      {
        onSuccess: () => {
          toast.success("Course assigned/updated successfully!");
          setStudentId("");
          setCourseId("");
          setGrade("");
          setProgress("");
        },
        onError: () => {
          toast.error("Assignment failed. Try again.");
        },
      }
    );
  };

  return (
    <Card className="p-6 w-full max-w-xl mx-auto mt-9">
      <h2 className="text-2xl font-semibold">Faculty Panel</h2>

      {/* Student Selector */}
      <div className="space-y-1">
        <label className="text-sm font-medium">Select Student</label>
        <Select value={studentId} onValueChange={setStudentId}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Choose student" />
          </SelectTrigger>
          <SelectContent>
            {students.map((s: Student) => (
              <SelectItem key={s._id} value={s._id}>
                {s.name} ({s.email})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Course Selector */}
      <div className="space-y-1">
        <label className="text-sm font-medium">Select Course</label>
        <Select value={courseId} onValueChange={setCourseId}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Choose course" />
          </SelectTrigger>
          <SelectContent>
            {courses.map((c: Course) => (
              <SelectItem key={c._id} value={c._id}>
              {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Optional Grade */}
      <div className="space-y-1">
        <label className="text-sm font-medium">Grade (optional)</label>
        <Input
          type="number"
          placeholder="Enter grade"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
        />
      </div>

      {/* Optional Progress */}
      <div className="space-y-1">
        <label className="text-sm font-medium">
          Progress Summary (optional)
        </label>
        <Input
          type="text"
          placeholder="Enter progress summary"
          value={progress}
          onChange={(e) => setProgress(e.target.value)}
        />
      </div>

      <Button onClick={handleAssign} className="w-full">
        Assign / Update
      </Button>
    </Card>
  );
}
