import { useGetUser } from "../../context/useGetUserContext";
import { useToast } from "../../context/useToastContext";
import Loading from "../../ui/Loading";
import { TbClockCheck } from "react-icons/tb";
import { BsArrowLeft, BsCheckAll } from "react-icons/bs";
import { SlBookOpen } from "react-icons/sl";
import { Link } from "react-router-dom";
import OrdersTable from "./OrdersTable";

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
      <div className="flex flex-col sm:flex-row gap-y-6 sm:items-center justify-between mt-8 text-xs">
        <div className="flex items-center gap-x-4">
          <div className="bg-almond-cookie dark:bg-dark-cerulean p-2 rounded-lg transition-colors duration-300">
            <TbClockCheck className="w-7 h-7" />
          </div>
          <div className="flex flex-col gap-y-2">
            <span className="opacity-50 ">تاریخ پیوستن</span>
            <p className="">{formattedDate(user?.createdAt)}</p>
          </div>
        </div>
        <div className="flex items-center gap-x-4">
          <div className="bg-almond-cookie dark:bg-dark-cerulean p-2 rounded-lg transition-colors duration-300">
            <SlBookOpen className="w-7 h-7" />
          </div>
          <div className="flex flex-col gap-y-2">
            <span className="opacity-50 ">دوره ها</span>
            <p className="">{user?.enrolledCourses.length}</p>
          </div>
        </div>
        <div className="flex items-center gap-x-4">
          <div className="bg-almond-cookie dark:bg-dark-cerulean p-2 rounded-lg transition-colors duration-300">
            <BsCheckAll className="w-7 h-7" />
          </div>
          <div className="flex flex-col gap-y-2">
            <span className="opacity-50 ">سفارش ها</span>
            <p className="">{user?.enrolledCourses.length}</p>
          </div>
        </div>
      </div>
      <div className="w-full h-[0.5px] my-10 bg-light-shade-yellow dark:bg-dark-purple transition-colors duration-300"></div>
      <div className="flex flex-col sm:flex-row gap-y-4 sm:items-center justify-between mb-8">
        <h1>آخرین سفارش های من</h1>
        <Link
          to="/student/payments"
          className="text-xs flex items-center gap-x-1 hover:text-butter-caramel dark:hover:text-moderate-violet transition-colors duration-300"
        >
          <span>مشاهده همه سفارش ها</span>
          <BsArrowLeft className="w-4 h-4" />
        </Link>
      </div>
      <OrdersTable />
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
