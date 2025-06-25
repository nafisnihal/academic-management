import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useStudentProfile = (id: string) => {
  return useQuery({
    queryKey: ["student-profile", id],
    queryFn: async () => {
      const response = await axios.get(`/api/students/${id}/profile`);
      return response.data;
    },
    enabled: !!id, // only fetch if id is present
  });
};
