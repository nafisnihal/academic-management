"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFaculties } from "@/hooks/useFaculties";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

interface Faculty {
  _id: string;
  name: string;
  email: string;
}

interface HandleAddEvent extends React.FormEvent<HTMLFormElement> {}

export default function FacultyManagementModal() {
  const { data: faculties, isLoading } = useFaculties();
  const [form, setForm] = useState({ name: "", email: "" });
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const handleAdd = async (e: HandleAddEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    try {
      await axios.post("/api/faculties", form);
      toast.success("Faculty added");
      queryClient.invalidateQueries({ queryKey: ["faculties"] });
      setForm({ name: "", email: "" });
    } catch {
      toast.error("Failed to add faculty");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/faculties/${id}`);
      toast.success("Faculty deleted");
      queryClient.invalidateQueries({ queryKey: ["faculties"] });
    } catch {
      toast.error("Failed to delete");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Manage Faculties</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Faculty Management</DialogTitle>
          <DialogDescription>
            Add new faculty members and manage existing ones.
          </DialogDescription>
        </DialogHeader>

        {/* Add Faculty Form */}
        <form onSubmit={handleAdd} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Faculty Name</Label>
            <Input
              id="name"
              placeholder="Enter faculty name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter faculty email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <DialogFooter className="pt-2">
            <Button type="submit">Add Faculty</Button>
          </DialogFooter>
        </form>

        {/* Faculty List */}
        <div className="pt-4 space-y-3">
          <h3 className="font-semibold text-lg">Existing Faculties</h3>
          {isLoading ? (
            <p>Loading faculties...</p>
          ) : faculties?.length === 0 ? (
            <p className="text-sm text-muted-foreground">No faculties found.</p>
          ) : (
            faculties?.map((faculty: Faculty) => (
              <div
                key={faculty._id}
                className="flex items-center justify-between border px-3 py-2 rounded-md"
              >
                <div>
                  <p className="font-medium">{faculty.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {faculty.email}
                  </p>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(faculty._id)}
                >
                  Delete
                </Button>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
