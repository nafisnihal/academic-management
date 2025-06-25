"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFaculties } from "@/hooks/useFaculties";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

export default function Faculties() {
  const { data: faculties, isLoading } = useFaculties();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const queryClient = useQueryClient();

  const handleAdd = async () => {
    if (!name || !email) return;
    await axios.post("/api/faculties", { name, email });
    setName("");
    setEmail("");
    queryClient.invalidateQueries({ queryKey: ["faculties"] });
  };

  const handleDelete = async (id: string) => {
    await axios.delete(`/api/faculties/${id}`);
    queryClient.invalidateQueries({ queryKey: ["faculties"] });
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Faculty Management</h1>

      <div className="flex gap-2">
        <Input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button onClick={handleAdd}>Add</Button>
      </div>

      {isLoading ? (
        <p>Loading faculties...</p>
      ) : (
        <div className="space-y-3">
          {faculties?.map((faculty: any) => (
            <div
              key={faculty._id}
              className="flex justify-between items-center border p-3 rounded"
            >
              <div>
                <p className="font-semibold">{faculty.name}</p>
                <p className="text-sm text-gray-600">{faculty.email}</p>
              </div>
              <Button
                variant="destructive"
                onClick={() => handleDelete(faculty._id)}
              >
                Delete
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
