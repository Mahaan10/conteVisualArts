import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CustomNavlink from "./CustomNavlink";
import { MdSignalCellularAlt2Bar } from "react-icons/md";
import { HiOutlineAdjustmentsVertical, HiOutlinePower } from "react-icons/hi2";
import ThemeMode from "./ThemeMode";
import HeaderMenu from "./HeaderMenu";
import { IoMenuOutline } from "react-icons/io5";
import { TbSmartHome } from "react-icons/tb";
import { PiUser } from "react-icons/pi";
import { FiUsers } from "react-icons/fi";
import { SiCountingworkspro } from "react-icons/si";
import Modal from "./Modal";
import AuthContainer from "../features/authentication/AuthContainer";
import {
  createTheme,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  ThemeProvider,
} from "flowbite-react";
import { useGetUser } from "../context/useGetUserContext";
import { BsCalendar3Event, BsFolder2Open } from "react-icons/bs";
import { Loader } from "./Loading";
import useLogout from "../hooks/useLogout";
import { FaRegCommentDots } from "react-icons/fa6";
import { useThemeMode } from "../context/useThemeModeContext";
import toast from "react-hot-toast";

const customTheme = createTheme({
  dropdown: {
    arrowIcon: "",
    content: "w-60",
    floating: {
      style: {
        auto: "border border-gray-200 bg-whitesmoke text-black dark:border-gray-700 dark:bg-gray-900 dark:text-whitesmoke",
      },
      header:
        "flex items-center gap-x-2 px-0 w-[90%] mx-auto py-2 text-xs text-black/70 dark:text-whitesmoke/80",
      divider: "bg-gray-200/80 dark:bg-gray-800/50",
      item: {
        icon: "ml-2 w-5 h-5",
        base: "flex w-[90%] mx-auto my-3 rounded-lg cursor-pointer items-center justify-start px-0 py-3 text-sm text-inherit hover:bg-almond-cookie focus:bg-almond-cookie focus:outline-none dark:text-gray-200 dark:hover:bg-purple-plumeria dark:focus:bg-purple-plumeria dark:focus:text-white transition-all duration-150",
      },
    },
  },
  button: {
    color: {
      default:
        "cursor-pointer bg-almond-cookie dark:bg-dark-cerulean hover:bg-golden-sand dark:hover:bg-purple-plumeria transition-colors duration-300 focus:ring-0 text-black dark:text-whitesmoke px-1 lg:px-3",
    },
  },
});

function Header() {
  const { user, isLoading, isError, error, token, setToken, isTokenChecked } =
    useGetUser();
  const { themeMode } = useThemeMode();
  const { logout, isLoggedOut } = useLogout(setToken);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (isError) {
      toast.error(error?.response?.data?.message || "اطلاعات کاربری یافت نشد");
    }
  }, [isError, error]);

  useEffect(() => {
    const handleScroll = () => {
      const shouldScroll = window.scrollY > 10;
      setIsScrolled((prev) => (prev !== shouldScroll ? shouldScroll : prev));
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logoutHandler = async () => {
    try {
      await logout();
    } catch (err) {
      console.error(err);
    }
  };

  const renderUserMenu = () => {
    if (!user) return null;

    if (user?.role === "student") {
      return (
        <>
          <DropdownItem as={Link} to="/student" icon={TbSmartHome}>
            پنل کاربری
          </DropdownItem>
          <DropdownItem as={Link} to="/student/courses" icon={BsFolder2Open}>
            دوره های من
          </DropdownItem>
          <DropdownItem
            as={Link}
            to="/student/payments"
            icon={HiOutlineAdjustmentsVertical}
          >
            سفارش های من
          </DropdownItem>
        </>
      );
    }

    return (
      <>
        <DropdownItem as={Link} to="/admin/dashboard" icon={TbSmartHome}>
          پیشخوان
        </DropdownItem>
        <DropdownItem as={Link} to="/admin/courses" icon={BsFolder2Open}>
          دوره ها
        </DropdownItem>
        <DropdownItem as={Link} to="/admin/users" icon={FiUsers}>
          کاربران
        </DropdownItem>
        <DropdownItem
          as={Link}
          to="/admin/studentWorks"
          icon={SiCountingworkspro}
        >
          آثار هنرجویان
        </DropdownItem>
        <DropdownItem as={Link} to="/admin/news" icon={BsCalendar3Event}>
          رویدادها
        </DropdownItem>
        <DropdownItem as={Link} to="/admin/reviews" icon={FaRegCommentDots}>
          نظرات کاربران
        </DropdownItem>
        <DropdownItem
          as={Link}
          to="/admin/payments"
          icon={HiOutlineAdjustmentsVertical}
        >
          جزئیات حساب
        </DropdownItem>
      </>
    );
  };

  if (!isTokenChecked) return <Loader />;

  return (
    <>
      <header
        className={`flex items-center justify-between border-b border-light-shade-yellow dark:border-moderate-violet z-20 max-w-[1920px] mx-auto transition-all duration-500 ease-in-out ${
          isScrolled
            ? "bg-whitesmoke/90 shadow-md dark:shadow-zinc-800/50 dark:bg-slate-950/80 backdrop-blur fixed top-0 md:left-10 md:right-10 left-2 right-2"
            : "relative"
        }`}
      >
        {/* Mobile Menu Button */}
        <button
          className="min-[1070px]:hidden block mr-5 cursor-pointer"
          aria-label="منوی موبایل"
          aria-expanded={isDrawerOpen}
          onClick={() => setIsDrawerOpen(!isDrawerOpen)}
        >
          <IoMenuOutline className="w-8 h-8" />
        </button>

        {/* Right Section */}
        <div className="flex items-center justify-center">
          <Link to="/">
            <img
              src={
                themeMode === "light"
                  ? "/images/light.jpg"
                  : "/images/dark-bgg.jpg"
              }
              alt="مدرسه هنری کنته - لوگو رسمی آموزشگاه هنرهای تجسمی"
              loading="lazy"
              className="h-16 w-16 lg:rounded-tr-lg transition-all duration-500 dark:bg-transparent"
            />
          </Link>

          <nav
            className="hidden min-[1070px]:flex items-center gap-x-6 text-xs mx-2 list-none"
            aria-label="ناوبری اصلی"
          >
            <li>
              <CustomNavlink to="/">صفحه اصلی</CustomNavlink>
            </li>
            <li>
              <CustomNavlink to="/courses">همه دوره ها</CustomNavlink>
            </li>
            <li>
              <CustomNavlink to="/student-works">آثار هنرجویان</CustomNavlink>
            </li>
            <li>
              <CustomNavlink to="/news">اخبار و رویداد ها</CustomNavlink>
            </li>
            <li>
              <CustomNavlink to="/about">درباره ما</CustomNavlink>
            </li>
            <li>
              <CustomNavlink to="/contact">ارتباط با ما</CustomNavlink>
            </li>
            <li>
              <CustomNavlink to="/terms-of-services">
                قوانین و مقررات
              </CustomNavlink>
            </li>
          </nav>
        </div>

        {/* Left Section */}
        <div className="flex items-center justify-between gap-x-2 lg:gap-x-4 lg:ml-5 sm:ml-3.5 ml-1">
          <ThemeMode />

          {!token ? (
            <button
              className="btn lg:flex hidden"
              onClick={() => setIsModalOpen(true)}
              aria-label="ورود یا ثبت نام"
            >
              <MdSignalCellularAlt2Bar className="w-5 h-5" />
              <span>ورود|عضویت</span>
            </button>
          ) : isLoading ? (
            <Loader />
          ) : (
            <ThemeProvider theme={customTheme}>
              <Dropdown
                label={<PiUser className="w-5 h-5" />}
                placement="bottom-start"
                size="sm"
                dismissOnClick={true}
              >
                <DropdownHeader>
                  <img
                    src={user?.profilePicture || "/images/user.jpg"}
                    alt={user?.name}
                    loading="lazy"
                    className="w-10 h-10 rounded-full object-cover object-center"
                  />
                  <div className="flex flex-col gap-y-2">
                    <span>{user?.name}</span>
                    <span className="truncate font-medium">{user?.phone}</span>
                  </div>
                </DropdownHeader>
                <DropdownDivider />
                {renderUserMenu()}
                <DropdownDivider />
                <DropdownItem
                  icon={HiOutlinePower}
                  onClick={logoutHandler}
                  className="hover:!bg-red-600 dark:hover:!bg-red-800 !my-1.5"
                >
                  {isLoggedOut ? <Loader /> : "خروج"}
                </DropdownItem>
              </Dropdown>
            </ThemeProvider>
          )}
        </div>
      </header>

      <HeaderMenu
        isOpen={isDrawerOpen}
        setIsOpen={setIsDrawerOpen}
        setIsModalOpen={setIsModalOpen}
      />

      {isModalOpen && (
        <Modal title="ورود یا ثبت نام" onClose={() => setIsModalOpen(false)}>
          <AuthContainer onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </>
  );
}

export default Header;
