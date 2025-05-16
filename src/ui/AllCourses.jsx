import { useToast } from "../context/useToastContext";
import useCourses from "../hooks/useCourses";
import Cards from "./Cards";
import Loading from "./Loading";

function AllCourses() {
  const { courses, error, isError, isLoading } = useCourses();
  const { showToast } = useToast();
  console.log(courses);

  if (!isLoading) return <Loading />;
  if (isError)
    return showToast("error", error?.response?.data?.message || error?.message);

  return <Cards array={courses} />;
}

export default AllCourses;
