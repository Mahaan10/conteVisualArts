import { NavLink, Outlet } from "react-router-dom";
import { useGetUser } from "../context/useGetUserContext";
import { CiEdit } from "react-icons/ci";
import { TbSmartHome } from "react-icons/tb";
import { BsCalendar3Event, BsFolder2Open } from "react-icons/bs";
import { HiOutlineAdjustmentsVertical, HiOutlinePower } from "react-icons/hi2";
import { useToast } from "../context/useToastContext";
import Loading, { Loader } from "./Loading";
import useLogout from "../hooks/useLogout";
import { SiCountingworkspro } from "react-icons/si";
import { FiUsers } from "react-icons/fi";

function AppLayout() {
  const { user, isLoading, isError, error, token } = useGetUser();
  const { isLoggedOut, logout } = useLogout();
  const { showToast } = useToast();

  if (isError || !token)
    return showToast(
      "error",
      error?.response?.data?.message || "اطلاعات کاربری یافت نشد"
    );

  if (isLoading) return <Loading />;

  const logoutHandler = async () => {
    await logout();
  };

  return (
    <div className="grid h-screen transition-colors duration-300 grid-cols-1 md:grid-cols-[15rem_1fr]">
      {/* Sidebar - visible only on md and above */}
      <div className="hidden md:flex flex-col justify-between py-4 text-2xl max-h-screen sticky top-0 overflow-y-auto">
        <ul className="flex flex-col gap-y-3">
          <li className="flex items-center w-[95%] mx-auto text-sm">
            <NavLink
              to={`${
                user?.role === "student"
                  ? "/student/profile"
                  : "/admin/dashboard"
              }`}
              className={({ isActive }) =>
                isActive
                  ? "bg-almond-cookie dark:bg-dark-cerulean flex items-center gap-x-2 hover:bg-golden-sand dark:hover:bg-purple-plumeria px-2 py-3 rounded-lg transition-all duration-300 w-full"
                  : "hover:bg-golden-sand dark:hover:bg-purple-plumeria flex items-center gap-x-2 px-2 py-3 rounded-lg transition-all duration-300 w-full"
              }
            >
              <TbSmartHome className="w-5 h-5" />
              <span>داشبورد</span>
            </NavLink>
          </li>
          <li className="flex items-center w-[95%] mx-auto text-sm">
            <NavLink
              to={`${
                user?.role === "student" ? "/student/courses" : "/admin/courses"
              }`}
              className={({ isActive }) =>
                isActive
                  ? "bg-almond-cookie dark:bg-dark-cerulean flex items-center gap-x-2 hover:bg-golden-sand dark:hover:bg-purple-plumeria px-2 py-3 rounded-lg transition-all duration-300 w-full"
                  : "hover:bg-golden-sand dark:hover:bg-purple-plumeria flex items-center gap-x-2 px-2 py-3 rounded-lg transition-all duration-300 w-full"
              }
            >
              <BsFolder2Open className="w-5 h-5" />
              <span>
                {user?.role === "student" ? "دوره های من" : "دوره ها"}
              </span>
            </NavLink>
          </li>
          {user?.role === "admin" && (
            <li className="flex items-center w-[95%] mx-auto text-sm">
              <NavLink
                to="/admin/users"
                className={({ isActive }) =>
                  isActive
                    ? "bg-almond-cookie dark:bg-dark-cerulean flex items-center gap-x-2 hover:bg-golden-sand dark:hover:bg-purple-plumeria px-2 py-3 rounded-lg transition-all duration-300 w-full"
                    : "hover:bg-golden-sand dark:hover:bg-purple-plumeria flex items-center gap-x-2 px-2 py-3 rounded-lg transition-all duration-300 w-full"
                }
              >
                <FiUsers className="w-5 h-5" />
                <span>کاربران</span>
              </NavLink>
            </li>
          )}
          {user?.role === "admin" && (
            <li className="flex items-center w-[95%] mx-auto text-sm">
              <NavLink
                to="/admin/studentWorks"
                className={({ isActive }) =>
                  isActive
                    ? "bg-almond-cookie dark:bg-dark-cerulean flex items-center gap-x-2 hover:bg-golden-sand dark:hover:bg-purple-plumeria px-2 py-3 rounded-lg transition-all duration-300 w-full"
                    : "hover:bg-golden-sand dark:hover:bg-purple-plumeria flex items-center gap-x-2 px-2 py-3 rounded-lg transition-all duration-300 w-full"
                }
              >
                <SiCountingworkspro className="w-5 h-5" />
                <span>آثار هنرجویان</span>
              </NavLink>
            </li>
          )}
          {user?.role === "admin" && (
            <li className="flex items-center w-[95%] mx-auto text-sm">
              <NavLink
                to="/admin/news"
                className={({ isActive }) =>
                  isActive
                    ? "bg-almond-cookie dark:bg-dark-cerulean flex items-center gap-x-2 hover:bg-golden-sand dark:hover:bg-purple-plumeria px-2 py-3 rounded-lg transition-all duration-300 w-full"
                    : "hover:bg-golden-sand dark:hover:bg-purple-plumeria flex items-center gap-x-2 px-2 py-3 rounded-lg transition-all duration-300 w-full"
                }
              >
                <BsCalendar3Event className="w-5 h-5" />
                <span>رویداد ها</span>
              </NavLink>
            </li>
          )}
          <li className="flex items-center w-[95%] mx-auto text-sm">
            <NavLink
              to={`${
                user?.role === "student"
                  ? "/student/payments"
                  : "/admin/payments"
              }`}
              className={({ isActive }) =>
                isActive
                  ? "bg-almond-cookie dark:bg-dark-cerulean flex items-center gap-x-2 hover:bg-golden-sand dark:hover:bg-purple-plumeria px-2 py-3 rounded-lg transition-all duration-300 w-full"
                  : "hover:bg-golden-sand dark:hover:bg-purple-plumeria flex items-center gap-x-2 px-2 py-3 rounded-lg transition-all duration-300 w-full"
              }
            >
              <HiOutlineAdjustmentsVertical className="w-5 h-5" />
              <span>
                {user?.role === "student" ? "سفارش های من" : "جزئیات حساب"}
              </span>
            </NavLink>
          </li>
          <li className="flex w-[95%] mx-auto text-sm">
            <button
              className="cursor-pointer px-2 py-3 rounded-lg transition-all duration-300 w-full text-right hover:bg-red-600 dark:hover:bg-red-800 flex gap-x-2 items-center"
              onClick={logoutHandler}
            >
              <HiOutlinePower className="w-5 h-5" />
              <span>{isLoggedOut ? <Loader /> : "خروج"}</span>
            </button>
          </li>
        </ul>
        {/* <div className="flex items-center justify-between text-xs w-[95%] mx-auto mt-6">
          <div className="flex items-center gap-x-4">
            <img
              src="/images/user.jpg"
              alt={user?.name}
              className="w-10 h-10 rounded-full object-cover object-center"
            />
            <div className="flex flex-col gap-y-1">
              <p>{user?.name}</p>
              <span>{user?.role === "student" ? "هنرجو" : "ادمین"}</span>
            </div>
          </div>
          <button className="cursor-pointer">
            <CiEdit className="w-5 h-5" />
          </button>
        </div> */}
      </div>

      {/* Main content */}
      <div className="p-8 overflow-y-auto">
        <div className="mx-auto max-w-screen-lg flex flex-col gap-y-12">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AppLayout;
