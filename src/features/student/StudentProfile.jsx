import { useGetUser } from "../../context/useGetUserContext";
import { useToast } from "../../context/useToastContext";
import Loading from "../../ui/Loading";
import { TbClockCheck } from "react-icons/tb";
import { BsCheckAll } from "react-icons/bs";
import { SlBookOpen } from "react-icons/sl";

import { FaRegComments } from "react-icons/fa6";

function StudentProfile() {
  const { user, isLoading, isError, error, token } = useGetUser();
  const { showToast } = useToast();

  if (isError || !token)
    return showToast(
      "error",
      error?.response?.data?.message || "اطلاعات کاربری یافت نشد"
    );

  if (isLoading) return <Loading />;

  return (
    <div className="container">
      <h1 className="text-xl font-bold">سوابق من</h1>
      <div className="w-full h-[0.5px] my-10 bg-light-shade-yellow dark:bg-dark-purple transition-colors duration-300"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-10 sm:items-center mt-8 text-xs">
        <div className="flex items-center gap-x-4">
          <div className="bg-almond-cookie dark:bg-dark-cerulean p-5 rounded-2xl transition-colors duration-300">
            <TbClockCheck className="w-8 h-8" />
          </div>
          <div className="flex flex-col gap-y-5">
            <span className="opacity-50 text-base">تاریخ پیوستن</span>
            <p className="">{formattedDate(user?.createdAt)}</p>
          </div>
        </div>
        <div className="flex items-center gap-x-4">
          <div className="bg-almond-cookie dark:bg-dark-cerulean p-5 rounded-2xl transition-colors duration-300">
            <SlBookOpen className="w-8 h-8" />
          </div>
          <div className="flex flex-col gap-y-5">
            <span className="opacity-50 text-base">دوره ها</span>
            <p className="">{user?.enrolledCourses.length} دوره</p>
          </div>
        </div>
        <div className="flex items-center gap-x-4">
          <div className="bg-almond-cookie dark:bg-dark-cerulean p-5 rounded-2xl transition-colors duration-300">
            <BsCheckAll className="w-8 h-8" />
          </div>
          <div className="flex flex-col gap-y-5">
            <span className="opacity-50 text-base">سفارش ها</span>
            <p className="">{user?.enrolledCourses.length} سفارش</p>
          </div>
        </div>
        <div className="flex items-center gap-x-4">
          <div className="bg-almond-cookie dark:bg-dark-cerulean p-5 rounded-2xl transition-colors duration-300">
            <FaRegComments className="w-8 h-8" />
          </div>
          <div className="flex flex-col gap-y-5">
            <span className="opacity-50 text-base">نظرات</span>
            <p className="">{user?.reviews.length} نظر</p>
          </div>
        </div>
      </div>
      {/* <div className="flex flex-col sm:flex-row gap-y-4 sm:items-center justify-between mb-8">
        <h1>آخرین سفارش های من</h1>
        <Link
          to="/student/payments"
          className="text-xs flex items-center gap-x-1 hover:text-butter-caramel dark:hover:text-moderate-violet transition-colors duration-300"
        >
          <span>مشاهده همه سفارش ها</span>
          <BsArrowLeft className="w-4 h-4" />
        </Link>
      </div>
      <OrdersTable /> */}
    </div>
  );
}

export default StudentProfile;

function formattedDate(isoString) {
  return new Date(isoString).toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}
