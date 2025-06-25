import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// Define the expected structure of a Student
export interface StudentType {
  _id: string;
  name: string;
  email: string;
  gpa?: number;
  enrolledCourses?: {
    courseId: string;
    grade?: number;
    progress?: string;
  }[];
}

export interface UpdateStudentPayload {
  id: string;
  data: {
    name: string;
    email: string;
    gpa?: number;
  };
}

export const useStudents = () => {
  return useQuery<StudentType[]>({
    queryKey: ["students"],
    queryFn: async () => {
      const res = await axios.get("/api/students");
      return res.data;
    },
  });
};

export const useUpdateStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: UpdateStudentPayload) => {
      const res = await axios.put(`/api/students/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });
};

export const useDeleteStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`/api/students/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });
};
