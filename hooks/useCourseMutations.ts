import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// Define the structure of a Course
export interface Course {
  _id: string;
  name: string;
  code: string;
  facultyId: string;
  enrolledStudentIds: string[];
}

// Input type for updating a course
interface UpdateCoursePayload {
  id: string;
  data: Partial<Omit<Course, "_id" | "enrolledStudentIds">>;
}

// 🔁 Fetch Courses
export const useCourses = () => {
  return useQuery<Course[]>({
    queryKey: ["courses"],
    queryFn: async () => {
      const res = await axios.get("/api/courses");
      return res.data;
    },
  });
};

// ✏️ Update Course
export const useUpdateCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: UpdateCoursePayload) => {
      const res = await axios.put<Course>(`/api/courses/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
};

// ❌ Delete Course
export const useDeleteCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`/api/courses/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
};
