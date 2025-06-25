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
  useDeleteStudent,
  useStudents,
  useUpdateStudent,
} from "@/hooks/useStudentMutations";
import { Eye, SquarePen, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import AddStudentModal from "./AddStudentModal";

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

interface HandleEditArg {
  _id: string;
  name: string;
  email: string;
  gpa?: number;
}

export default function StudentTable() {
  const { data = [], isLoading, error, refetch } = useStudents();
  const { mutate: deleteStudent } = useDeleteStudent();
  const { mutate: updateStudent } = useUpdateStudent();

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStudents, setFilteredStudents] = useState(data);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", gpa: "" });
  const [studentsPerPage, setStudentsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const indexOfLast = currentPage * studentsPerPage;
  const indexOfFirst = indexOfLast - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirst, indexOfLast);

  useEffect(() => {
    const filtered = data.filter(
      (s: Student) =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStudents(filtered);
    setCurrentPage(1);
  }, [searchTerm, data]);


const handleEdit = (student: HandleEditArg) => {
    setEditId(student._id);
    setForm({
        name: student.name,
        email: student.email,
        gpa: student.gpa?.toString() ?? "",
    });
};

  const handleUpdate = () => {
    updateStudent(
      { id: editId!, data: { ...form, gpa: parseFloat(form.gpa) } },
      {
        onSuccess: () => {
          toast.success("Student updated");
          refetch();
        },
        onError: () => toast.error("Update failed"),
      }
    );
    setEditId(null);
    setForm({ name: "", email: "", gpa: "" });
  };

  const handleDelete = (id: string) => {
    deleteStudent(id, {
      onSuccess: () => {
        toast.success("Student deleted");
        refetch();
      },
      onError: () => toast.error("Delete failed"),
    });
  };

  if (isLoading) return <p className="p-4">Loading students...</p>;
  if (error) return <p className="text-red-500">Error loading students</p>;

  return (
    <>
      <div className="space-y-4">
        <div className="flex justify-between items-center gap-4">
          <Button
            variant="outline"
            onClick={() => setIsDialogOpen(true)}
            className="cursor-pointer"
          >
            + Add Student
          </Button>
          <div className="flex justify-end items-center gap-4">
            <Input
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-[300px]"
            />
            <div className="flex items-center gap-2">
              <span className="text-sm">Rows per page:</span>
              <Select
                defaultValue="5"
                onValueChange={(val) => setStudentsPerPage(Number(val))}
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
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>GPA</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentStudents.map((student: Student) =>
                editId === student._id ? (
                  <TableRow key={student._id}>
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
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={form.gpa}
                        onChange={(e) =>
                          setForm({ ...form, gpa: e.target.value })
                        }
                      />
                    </TableCell>
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
                  <TableRow key={student._id}>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>{student.gpa ?? "N/A"}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Link href={`/students/${student._id}`} className="">
                        <Button
                          variant="outline"
                          size="sm"
                          className="cursor-pointer"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        className="cursor-pointer"
                        onClick={() => handleEdit(student)}
                      >
                        <SquarePen className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="cursor-pointer"
                        onClick={() => handleDelete(student._id)}
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
            length: Math.ceil(filteredStudents.length / studentsPerPage),
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
      <AddStudentModal open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </>
  );
}
