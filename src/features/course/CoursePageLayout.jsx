import { useParams } from "react-router";
import useSingleCourse from "../../hooks/useSingleCourse";
import { PiGraduationCapLight } from "react-icons/pi";
import Loading from "../../ui/Loading";
import { useToast } from "../../context/useToastContext";
import { BsClockHistory, BsCheckAll } from "react-icons/bs";
import { TbUsers, TbClockCheck } from "react-icons/tb";
import { FaRegCommentDots } from "react-icons/fa6";
import { PiCalendarCheck } from "react-icons/pi";
import { Rating, RatingStar } from "flowbite-react";

function CoursePageLayout() {
  const { id } = useParams();
  const { showToast } = useToast();
  const { course, error, isError, isLoading } = useSingleCourse(id);
  console.log(course);

  if (isLoading) return <Loading />;
  if (isError)
    return showToast(
      "error",
      error?.response?.data?.message || "خطا در بارگذاری"
    );

  return (
    <>
      <div className="my-10 mx-4">
        <div className="flex items-center gap-x-2 mb-10">
          <PiGraduationCapLight className="w-7 h-7" />
          <p className="text-xl">{course?.name}</p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="text-sm">{course?.description}</div>
            <div className="flex justify-between mt-8">
              <div className="flex items-center gap-x-10">
                <div className="flex flex-col gap-y-4 items-center">
                  <div className="bg-almond-cookie transition-colors duration-300 dark:bg-dark-cerulean p-4 rounded-2xl">
                    <BsClockHistory className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-bold">
                    {course?.duration} جلسه
                  </span>
                </div>
                <div className="flex flex-col gap-y-4 items-center">
                  <div className="bg-almond-cookie transition-colors duration-300 dark:bg-dark-cerulean p-4 rounded-2xl">
                    <TbUsers className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-bold">
                    {course?.enrolledStudents.length} هنرجو
                  </span>
                </div>
                <div className="flex flex-col gap-y-4 items-center">
                  <div className="bg-almond-cookie transition-colors duration-300 dark:bg-dark-cerulean p-4 rounded-2xl">
                    <BsCheckAll className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-bold">
                    {course?.availableSeats} ظرفیت مانده
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-y-2">
                <div className="flex items-center gap-x-1.5">
                  <span className="text-sm ">{19}</span>
                  <FaRegCommentDots className="w-4 h-4" />
                </div>
                <div className="flex flex-col gap-y-1.5">
                  <Rating>
                    <RatingStar />
                    <RatingStar />
                    <RatingStar />
                    <RatingStar />
                    <RatingStar filled={false} />
                  </Rating>
                  <p className="text-xs">5 از 11 رای</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-x-10 mt-8">
              <div className="flex items-center gap-x-1">
                <TbClockCheck className="w-4 h-4" />
                <div className="flex items-center text-xs gap-x-1">
                  <p>تاریخ انتشار:</p>
                  <span>{formattedDate(course?.createdAt)}</span>
                </div>
              </div>
              <div className="flex items-center gap-x-1">
                <PiCalendarCheck className="w-4 h-4" />
                <div className="flex items-center text-xs gap-x-1">
                  <p>تاریخ شروع کلاس:</p>
                  <span>{formattedDate(course?.startDate)}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <img src={course?.Image} alt={course?.name} loading="lazy" />
          </div>
        </div>
      </div>
    </>
  );
}

export default CoursePageLayout;

function formattedDate(isoString) {
  return new Date(isoString).toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}
