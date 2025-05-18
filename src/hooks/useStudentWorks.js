import { useQuery } from "@tanstack/react-query";
import getAllStudentsWorksApi from "../services/studentsWorksService";

export default function useStudentWorks() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["studentWorks"],
    queryFn: getAllStudentsWorksApi,
  });

  const studentWorks = data?.studentWorks || [];
  return { studentWorks, isLoading, isError, error };
}
