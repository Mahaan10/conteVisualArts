import {
  createTheme,
  Drawer,
  DrawerHeader,
  DrawerItems,
  Select,
  Sidebar,
  SidebarItemGroup,
  SidebarItems,
  ThemeProvider,
} from "flowbite-react";
import { PiGraduationCapLight, PiInfo } from "react-icons/pi";
import { GiAbstract024 } from "react-icons/gi";
import { BsPen } from "react-icons/bs";
import { HiOutlineUsers } from "react-icons/hi2";
import { IoHomeOutline } from "react-icons/io5";
import CustomNavlink from "./CustomNavlink";
import { useGetUser } from "../context/useGetUserContext";
import { Link } from "react-router-dom";
import { Loader } from "./Loading";
import toast from "react-hot-toast";
import { useEffect } from "react";
import useOutsideClick from "../hooks/useOutsideClick";
import { useThemeMode } from "../context/useThemeModeContext";

const customTheme = createTheme({
  drawer: {
    root: {
      base: "fixed z-40 overflow-y-auto bg-whitesmoke p-4 dark:bg-gray-950 transition-all duration-600",
      position: {
        right: {
          on: "right-0 top-0 w-full min-[300px]:max-sm:w-72 sm:max-md:w-76 md:w-80",
          off: "right-0 top-0 w-full md:max-w-80 translate-x-full",
        },
      },
    },
    header: {
      inner: {
        closeButton:
          "absolute end-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-700 dark:text-gray-400 hover:bg-gray-300 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-whitesmoke cursor-pointer",
        titleText:
          "mb-4 inline-flex items-center text-sm font-medium text-gray-500 dark:text-gray-400",
      },
    },
  },
  sidebar: {
    root: {
      collapsed: {
        off: "w-full",
      },
      inner:
        "h-full overflow-y-auto overflow-x-hidden rounded-lg bg-gray-100 dark:bg-gray-900 px-3 py-4 mt-6 w-full",
    },
  },
  select: {
    field: {
      select: {
        colors: {
          gray: "bg-whitesmoke dark:bg-slate-900 w-full dark:focus:ring-0 dark:border-zinc-800 dark:hover:border-zinc-600 dark:focus:border-zinc-400 border-gray-300 hover:border-gray-400 focus:border-gray-600 focus:ring-0 transition-colors duration-300 ease-in-out bg-[position:left_12px_center]",
        },
      },
    },
  },
});

function HeaderMenu({ isOpen, setIsOpen, setIsModalOpen }) {
  const { token, isLoading, isError, error, user } = useGetUser();
  const { themeMode, setThemeMode } = useThemeMode();

  useEffect(() => {
    if (isError) {
      toast.error(error?.response?.data?.message || "اطلاعات کاربری یافت نشد");
    }
  }, [isError, error]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setIsOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const sidebarRef = useOutsideClick(() => {
    if (isOpen && window.innerWidth < 1024) {
      setIsOpen(false);
    }
  });

  if (isError) return null;

  return (
    <ThemeProvider theme={customTheme}>
      <Drawer
        open={isOpen}
        onClose={() => setIsOpen(false)}
        position="right"
        ref={sidebarRef}
      >
        <DrawerHeader title="آموزشگاه هنرهای تجسمی کٌنته" />
        {!token ? (
          <button
            className="w-full cursor-pointer text-xs py-4 rounded-lg bg-almond-cookie dark:bg-dark-cerulean mt-2 hover:bg-golden-sand dark:hover:bg-purple-plumeria transition-colors duration-300"
            onClick={() => setIsModalOpen(true)}
          >
            ورود یا ثبت نام
          </button>
        ) : (
          <Link
            onClick={() => setIsOpen(false)}
            to={user?.role === "student" ? "/student" : "/admin"}
            className="w-full cursor-pointer text-xs py-4 rounded-lg bg-almond-cookie dark:bg-dark-cerulean mt-2 hover:bg-golden-sand dark:hover:bg-purple-plumeria transition-colors duration-300 flex items-center justify-center"
          >
            {isLoading ? (
              <Loader />
            ) : user?.role === "student" ? (
              "پنل کاربری"
            ) : (
              "پیشخوان"
            )}
          </Link>
        )}

        <DrawerItems>
          <Sidebar aria-label="منوی کناری">
            <SidebarItems>
              <SidebarItemGroup>
                <li className="text-sm rounded-lg transition-colors duration-300 py-1">
                  <CustomNavlink onClose={() => setIsOpen(false)} to="/">
                    <IoHomeOutline className="w-5 h-5 dark:text-gray-400 text-gray-700" />
                    <span>صفحه اصلی</span>
                  </CustomNavlink>
                </li>
                <li className="text-sm rounded-lg transition-colors duration-300 py-1">
                  <CustomNavlink onClose={() => setIsOpen(false)} to="/courses">
                    <PiGraduationCapLight className="w-5 h-5 dark:text-gray-400 text-gray-700" />
                    <span>همه دوره‌ها</span>
                  </CustomNavlink>
                </li>
                <li className="text-sm rounded-lg transition-colors duration-300 py-1">
                  <CustomNavlink
                    onClose={() => setIsOpen(false)}
                    to="/student-works"
                  >
                    <GiAbstract024 className="w-5 h-5 dark:text-gray-400 text-gray-700" />
                    <span>آثار هنرجویان</span>
                  </CustomNavlink>
                </li>
                <li className="text-sm rounded-lg transition-colors duration-300 py-1">
                  <CustomNavlink onClose={() => setIsOpen(false)} to="/news">
                    <BsPen className="w-5 h-5 dark:text-gray-400 text-gray-700" />
                    <span>اخبار و رویدادها</span>
                  </CustomNavlink>
                </li>
                <li className="text-sm rounded-lg transition-colors duration-300 py-1">
                  <CustomNavlink onClose={() => setIsOpen(false)} to="/about">
                    <HiOutlineUsers className="w-5 h-5 dark:text-gray-400 text-gray-700" />
                    <span>درباره ما</span>
                  </CustomNavlink>
                </li>
                <li className="text-sm rounded-lg transition-colors duration-300 py-1">
                  <CustomNavlink onClose={() => setIsOpen(false)} to="/contact">
                    <PiInfo className="w-5 h-5 dark:text-gray-400 text-gray-700" />
                    <span>ارتباط با ما</span>
                  </CustomNavlink>
                </li>
              </SidebarItemGroup>
            </SidebarItems>
          </Sidebar>
        </DrawerItems>
        <div className="mt-4">
          <Select
            name="theme"
            color="gray"
            className="w-full mx-auto"
            value={themeMode}
            onChange={(event) => setThemeMode(event.target.value)}
          >
            <option value="dark">حالت تیره</option>
            <option value="light">حالت روشن</option>
          </Select>
        </div>
      </Drawer>
    </ThemeProvider>
  );
}

export default HeaderMenu;
