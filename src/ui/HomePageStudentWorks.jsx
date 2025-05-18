import { Link } from "react-router-dom";
import { useToast } from "../context/useToastContext";
import useStudentWorks from "../hooks/useStudentWorks";
import Loading from "./Loading";

function HomePageStudentWorks() {
  const { studentWorks, error, isError, isLoading } = useStudentWorks();
  const { showToast } = useToast();

  if (isLoading) return <Loading />;
  if (isError)
    return showToast(
      "error",
      error?.response?.data?.message || "بارگذاری با خطا مواجه شد"
    );
  return (
    <>
      {studentWorks.map((studentWork) => (
        <Link
          key={studentWork._id}
          to={studentWork.title}
          className="flex flex-col gap-y-2 items-center w-full"
        >
          <div className="w-40 h-40">
            <img
              src={studentWork.image}
              alt={studentWork.title}
              className="rounded-lg"
            />
          </div>
          <h1 className="text-sm text-nowrap w-40 text-right">
            {studentWork.title}
          </h1>
        </Link>
      ))}
    </>
  );
}

export default HomePageStudentWorks;
