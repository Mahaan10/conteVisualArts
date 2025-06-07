import { SlBookOpen } from "react-icons/sl";
import useCourses from "../../hooks/useCourses";
import useUsers from "../../hooks/useUsers";
import { BsPen } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { GiAbstract024 } from "react-icons/gi";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import useStudentWorks from "../../hooks/useStudentWorks";
import useNews from "../../hooks/useNews";
import { Loader } from "../../ui/Loading";
import { useToast } from "../../context/useToastContext";

function AdminDashboard() {
  const { users, error, isError, isLoading } = useUsers();
  const {
    courses,
    error: coursesError,
    isError: coursesIsError,
    isLoading: coursesIsLoading,
  } = useCourses();
  const {
    studentWorks,
    error: studentWorksError,
    isError: studentWorksIsError,
    isLoading: studentWorksIsLoading,
  } = useStudentWorks();
  const {
    news,
    error: newsError,
    isError: newsIsError,
    isLoading: newsIsLoading,
  } = useNews();
  const { showToast } = useToast();

  if (isLoading || coursesIsLoading || studentWorksIsLoading || newsIsLoading)
    return <Loader />;

  if (isError || coursesIsError || studentWorksIsError || newsIsError)
    return showToast(
      "error",
      error?.response?.data?.message ||
        newsError?.response?.data?.message ||
        studentWorksError?.response?.data?.message ||
        coursesError?.response?.data?.message ||
        "اطلاعات یافت نشد"
    );

  return (
    <div className="container">
      <h1 className="text-xl font-bold">داشبورد</h1>
      <div className="w-full h-[0.5px] my-10 bg-light-shade-yellow dark:bg-dark-purple transition-colors duration-300"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-10 sm:items-center mt-8 text-xs">
        <div className="flex items-center gap-x-4">
          <div className="bg-almond-cookie dark:bg-dark-cerulean p-5 rounded-2xl transition-colors duration-300">
            <FiUsers className="w-8 h-8" />
          </div>
          <div className="flex flex-col gap-y-5">
            <span className="opacity-50 text-base">کاربران</span>
            <p className="">{users?.length} کاربر</p>
          </div>
        </div>
        <div className="flex items-center gap-x-4">
          <div className="bg-almond-cookie dark:bg-dark-cerulean p-5 rounded-2xl transition-colors duration-300">
            <SlBookOpen className="w-8 h-8" />
          </div>
          <div className="flex flex-col gap-y-5">
            <span className="opacity-50 text-base">دوره ها</span>
            <p className="">{courses?.length} دوره</p>
          </div>
        </div>
        <div className="flex items-center gap-x-4">
          <div className="bg-almond-cookie dark:bg-dark-cerulean p-5 rounded-2xl transition-colors duration-300">
            <GiAbstract024 className="w-8 h-8" />
          </div>
          <div className="flex flex-col gap-y-5">
            <span className="opacity-50 text-base">آثار هنرجویان</span>
            <p className="">{studentWorks?.length} اثر</p>
          </div>
        </div>
        <div className="flex items-center gap-x-4">
          <div className="bg-almond-cookie dark:bg-dark-cerulean p-5 rounded-2xl transition-colors duration-300">
            <BsPen className="w-8 h-8" />
          </div>
          <div className="flex flex-col gap-y-5">
            <span className="opacity-50 text-base">اخبار و رویدادها</span>
            <p className="">{news?.length} رویداد</p>
          </div>
        </div>
        <div className="flex items-center gap-x-4">
          <div className="bg-almond-cookie dark:bg-dark-cerulean p-5 rounded-2xl transition-colors duration-300">
            <HiOutlineShoppingBag className="w-8 h-8" />
          </div>
          <div className="flex flex-col gap-y-5">
            <span className="opacity-50 text-base">جزئیات حساب</span>
            <p className="">{19} سفارش</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
