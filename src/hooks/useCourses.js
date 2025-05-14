import { useQuery } from "@tanstack/react-query";
import getAllCoursesApi from "../services/coursesService";

export default function useCourses() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["courses"],
    queryFn: getAllCoursesApi,
  });

  const courses = data?.courses || [];
  return { courses, isLoading, isError, error };
}
