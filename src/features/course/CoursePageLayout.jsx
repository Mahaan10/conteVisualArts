import { useParams } from "react-router";
import useSingleCourse from "../../hooks/useSingleCourse";
import { PiGraduationCapLight } from "react-icons/pi";
import Loading from "../../ui/Loading";
import { useToast } from "../../context/useToastContext";

function CoursePageLayout() {
  const { slug } = useParams();
  const { showToast } = useToast();
  const { course, error, isError, isLoading } = useSingleCourse(slug);
  console.log(course);

  if (isLoading) return <Loading />;
  if (isError)
    return showToast(
      "error",
      error?.response?.data?.message || "خطا در بارگذاری"
    );

  return (
    <>
      <div className="my-10 flex items-center justify-between mx-4">
        <div className="flex items-center gap-x-2">
          <PiGraduationCapLight className="w-7 h-7" />
          <p className="text-xl">{course?.name}</p>
        </div>
      </div>
    </>
  );
}

export default CoursePageLayout;
