import { useQuery } from "@tanstack/react-query";
import { getSingleCourseApi } from "../services/coursesService";

export default function useSingleCourse(id) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["course", id],
    queryFn: () => getSingleCourseApi(id),
    enabled: !!id
  });

  const course = data?.course || {}

  return { course, isLoading, isError, error };
}
