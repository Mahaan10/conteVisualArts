import { useQuery } from "@tanstack/react-query";
import { getSingleCourseApi } from "../services/coursesService";

export default function useSingleCourse(slug) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["course", slug],
    queryFn: () => getSingleCourseApi(slug),
    enabled: !!slug
  });

  const course = data?.course || {}

  return { course, isLoading, isError, error };
}
