import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

interface AssignPayload {
  studentId: string;
  courseId: string;
  grade?: number;
  progress?: string;
}

interface ErrorResponse {
  error: string;
}

export const useAssignCourseToStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      studentId,
      courseId,
      grade,
      progress,
    }: AssignPayload) => {
      const res = await axios.put(`/api/students/${studentId}/courses`, {
        courseId,
        grade,
        progress,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      if (error.response?.data?.error) {
        toast(error.response.data.error);
      } else {
        toast("An unexpected error occurred.");
      }
    },
  });
};
