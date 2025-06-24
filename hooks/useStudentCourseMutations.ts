import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

export const useAssignCourseToStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      studentId,
      courseId,
      grade,
      progress,
    }: {
      studentId: string;
      courseId: string;
      grade?: number;
      progress?: string;
    }) => {
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
    onError: (error: any) => {
      if (error.response?.data?.error) {
        toast(error.response.data.error);
      }
    },
  });
};
