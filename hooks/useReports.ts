import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface CourseStat {
  courseName: string;
  month: number;
  year: number;
  count: number;
}

interface TopPerformer {
  studentId: string;
  studentName: string;
  courseId: string;
  courseName: string;
  grade: number;
}

export const useCourseEnrollments = () => {
  return useQuery<CourseStat[]>({
    queryKey: ["courseEnrollments"],
    queryFn: async () => {
      const res = await axios.get("/api/reports/enrollments");
      return res.data;
    },
  });
};

export const useTopPerformers = () => {
  return useQuery<TopPerformer[]>({
    queryKey: ["top-performers"],
    queryFn: async () => {
      const res = await axios.get("/api/reports/top-performers");
      return res.data;
    },
  });
};
