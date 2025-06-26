import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface CourseStat {
  courseName: string;
  month: number;
  year: number;
  count: number;
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
