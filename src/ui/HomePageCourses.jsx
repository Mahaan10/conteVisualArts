import { Link } from "react-router-dom";
import useCourses from "../hooks/useCourses";
import Loading from "./Loading";
import { useToast } from "../context/useToastContext";

function HomePageCourses() {
  const { courses, error, isError, isLoading } = useCourses();
  const { showToast } = useToast();

  if (isLoading) return <Loading />;
  if (isError)
    return showToast(
      "error",
      error?.response?.data?.message || "بارگذاری با خطا مواجه شد"
    );

  /* Filter courses based on isActive */
  const filteredCourses = courses.filter(
    (activeCourses) => activeCourses.isActive
  );

  return (
    <>
      {filteredCourses.map((course) => (
        <Link
          key={course._id}
          to={course.name}
          className="flex flex-col gap-y-2 items-center w-full"
        >
          <div className="w-40 h-40">
            <img src={course.Image} alt={course.name} className="rounded-lg" />
          </div>
          <h1 className="text-sm text-nowrap w-40 text-right">{course.name}</h1>
        </Link>
      ))}
    </>
  );
}

export default HomePageCourses;
