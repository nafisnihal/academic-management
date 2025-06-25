import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useFaculties = () =>
  useQuery({
    queryKey: ["faculties"],
    queryFn: async () => {
      const res = await axios.get("/api/faculties");
      return res.data;
    },
  });
