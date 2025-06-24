import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useCourses = () => {
  return useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const res = await axios.get("/api/courses");
      return res.data;
    },
  });
};
