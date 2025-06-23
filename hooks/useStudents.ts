import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useStudents = () => {
  return useQuery({
    queryKey: ["students"],
    queryFn: async () => {
      const res = await axios.get("/api/students");
      return res.data;
    },
  });
};
