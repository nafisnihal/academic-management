"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useCourses,
  useDeleteCourse,
  useUpdateCourse,
} from "@/hooks/useCourseMutations";
import { SquarePen, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import FacultyManagementModal from "../faculty/FacultyManagementModal";
import AddCourseModal from "./AddCourseModal";

interface Course {
  _id: string;
  name: string;
  code: string;
  enrolledStudentIds?: string[];
  facultyName?: string;
}

interface EditableCourse {
  _id: string;
  name: string;
  code: string;
}

export default function CourseTable() {
  const { data = [], isLoading, error, refetch } = useCourses();
  const { mutate: deleteCourse } = useDeleteCourse();
  const { mutate: updateCourse } = useUpdateCourse();

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(
    data as Course[]
  );
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", code: "" });
  const [coursesPerPage, setCoursesPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const indexOfLast = currentPage * coursesPerPage;
  const indexOfFirst = indexOfLast - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirst, indexOfLast);

  useEffect(() => {
    const filtered = (data as Course[]).filter(
      (c: Course) =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.code.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCourses(filtered);
    setCurrentPage(1);
  }, [searchTerm, data]);

  const handleEdit = (course: EditableCourse) => {
    setEditId(course._id);
    setForm({ name: course.name, code: course.code });
  };

  const handleUpdate = () => {
    updateCourse(
      { id: editId!, data: form },
      {
        onSuccess: () => {
          toast.success("Course updated");
          refetch();
        },
        onError: () => toast.error("Update failed"),
      }
    );
    setEditId(null);
    setForm({ name: "", code: "" });
  };

  const handleDelete = (id: string) => {
    deleteCourse(id, {
      onSuccess: () => {
        toast.success("Course deleted");
        refetch();
      },
      onError: () => toast.error("Delete failed"),
    });
  };

  if (isLoading) return <p className="p-4">Loading courses...</p>;
  if (error) return <p className="text-red-500">Error loading courses</p>;

  return (
    <>
      <div className="space-y-4">
        <div className="flex justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(true)}
              className="cursor-pointer"
            >
              + Add Course
            </Button>
            <FacultyManagementModal />
          </div>
          <div className="flex justify-end items-center gap-4">
            <Input
              placeholder="Search by name or code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-[300px]"
            />
            <div className="flex items-center gap-2">
              <span className="text-sm">Rows per page:</span>
              <Select
                defaultValue="5"
                onValueChange={(val) => setCoursesPerPage(Number(val))}
              >
                <SelectTrigger className="w-20">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto border rounded-md ">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course Name</TableHead>
                <TableHead>Course Code</TableHead>
                <TableHead>Total Enrolled</TableHead>
                <TableHead>Faculty</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentCourses.map((course: Course) =>
                editId === course._id ? (
                  <TableRow key={course._id}>
                    <TableCell>
                      <Input
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={form.code}
                        onChange={(e) =>
                          setForm({ ...form, code: e.target.value })
                        }
                      />
                    </TableCell>
                    <TableCell>
                      {course.enrolledStudentIds?.length || 0}
                    </TableCell>
                    <TableCell>{course.facultyName || "N/A"}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button size="sm" onClick={handleUpdate}>
                        Save
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditId(null)}
                      >
                        Cancel
                      </Button>
                    </TableCell>
                  </TableRow>
                ) : (
                  <TableRow key={course._id}>
                    <TableCell>{course.name}</TableCell>
                    <TableCell>{course.code}</TableCell>
                    <TableCell>
                      {course.enrolledStudentIds?.length || 0}
                    </TableCell>
                    <TableCell>{course.facultyName || "N/A"}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(course)}
                      >
                        <SquarePen className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(course._id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-end gap-2">
          {Array.from({
            length: Math.ceil(filteredCourses.length / coursesPerPage),
          }).map((_, i) => (
            <Button
              key={i}
              variant={currentPage === i + 1 ? "default" : "outline"}
              onClick={() => setCurrentPage(i + 1)}
              size="sm"
            >
              {i + 1}
            </Button>
          ))}
        </div>
      </div>
      <AddCourseModal open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </>
  );
}
