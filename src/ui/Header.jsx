import { Link } from "react-router-dom";
import CustomNavlink from "./CustomNavlink";
import { MdSignalCellularAlt2Bar } from "react-icons/md";
import {
  HiOutlineAdjustmentsVertical,
  HiOutlinePower,
  HiOutlineShoppingBag,
} from "react-icons/hi2";
import ThemeMode from "./ThemeMode";
import HeaderMenu from "./HeaderMenu";
import { useState } from "react";
import { IoMenuOutline } from "react-icons/io5";
import { TbSmartHome } from "react-icons/tb";
import { PiUser } from "react-icons/pi";
import Modal from "./Modal";
import AuthContainer from "../features/authentication/AuthContainer";
import ShoppingMenu from "./ShoppingMenu";
import { useToast } from "../context/useToastContext";
import {
  createTheme,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  ThemeProvider,
} from "flowbite-react";
import { useGetUser } from "../context/useGetUserContext";
import { BsFolder2Open } from "react-icons/bs";

const customTheme = createTheme({
  dropdown: {
    arrowIcon: "mr-2",
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
        base: "flex w-[90%] mx-auto my-3 rounded-lg cursor-pointer items-center justify-start px-0 py-3 text-sm text-inherit hover:bg-almond-cookie focus:bg-almond-cookie focus:outline-none dark:text-gray-200 dark:hover:bg-purple-plumeria dark:hover:text-white dark:focus:bg-purple-plumeria dark:focus:text-white transition-all duration-150",
      },
    },
  },
  button: {
    color: {
      default:
        "cursor-pointer bg-almond-cookie dark:bg-dark-cerulean hover:bg-golden-sand dark:hover:bg-purple-plumeria transition-colors duration-300 focus:ring-0 text-black dark:text-whitesmoke",
    },
  },
});

function Header() {
  const { user, isLoading, isError, error, token } = useGetUser();
  const { showToast } = useToast();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShoppingMenuOpen, setIsShoppingMenuOpen] = useState(false);

  if (isError)
    return showToast(
      "error",
      error?.response?.data?.message || "اطلاعات کاربری یافت نشد"
    );

  console.log("User:", user);
  return (
    <>
      <div className="flex items-center justify-between border-b border-light-shade-yellow dark:border-moderate-violet transition-colors duration-300">
        {/* Header Menu */}
        <button
          className="lg:hidden block mr-5 cursor-pointer"
          onClick={() => setIsDrawerOpen(!isDrawerOpen)}
        >
          <IoMenuOutline className="w-8 h-8" />
        </button>
        <div className="flex items-center justify-center">
          {/* Brand Logo */}
          <Link to="/" className="ml-2">
            <img
              src="/images/Logo.jpg"
              alt="Conte School Logo"
              loading="lazy"
              className="h-16 w-16 lg:rounded-tr-lg"
            />
          </Link>
          {/* Header Navbar */}
          <ul className="hidden lg:flex items-center gap-x-6 text-xs ml-2">
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
          </ul>
        </div>
        {/* Left Section */}
        <div className="flex items-center justify-between gap-x-2 lg:gap-x-4 lg:ml-5 ml-3.5">
          {/* Theme Mode buttons */}
          <ThemeMode />
          {/* Shopping Card button */}
          <button
            className="cursor-pointer bg-almond-cookie p-2 rounded-full dark:bg-dark-cerulean hover:bg-golden-sand dark:hover:bg-purple-plumeria transition-colors duration-300"
            onClick={() => setIsShoppingMenuOpen(!isShoppingMenuOpen)}
          >
            <HiOutlineShoppingBag className="w-5 h-5" />
          </button>
          {/* Login or Sign up button */}
          {!token ? (
            <button
              className="btn lg:flex hidden"
              onClick={() => setIsModalOpen(!isModalOpen)}
            >
              <MdSignalCellularAlt2Bar className="w-5 h-5" />
              <span>ورود|عضویت</span>
            </button>
          ) : user?.role === "student" ? (
            <ThemeProvider theme={customTheme}>
              <Dropdown
                label={<PiUser className="w-5 h-5" />}
                placement="bottom-start"
                size="sm"
                dismissOnClick={false}
              >
                <DropdownHeader>
                  <img
                    src={`${
                      user?.profilePicture
                        ? user?.profilePicture
                        : "/images/user.jpg"
                    }`}
                    alt={user?.name}
                    loading="lazy"
                    className="w-10 h-10 rounded-full object-cover object-center"
                  />
                  <div className="flex flex-col gap-y-2">
                    <span className="">{user?.name}</span>
                    <span className="truncate font-medium">{user?.phone}</span>
                  </div>
                </DropdownHeader>
                <DropdownDivider />
                <DropdownItem as={Link} to="/profile" icon={TbSmartHome}>
                  حساب کاربری
                </DropdownItem>
                <DropdownItem
                  as={Link}
                  to="/profile/courses"
                  icon={BsFolder2Open}
                >
                  دوره های من
                </DropdownItem>
                <DropdownItem
                  as={Link}
                  to="/profile/payments"
                  icon={HiOutlineAdjustmentsVertical}
                >
                  سفارش های من
                </DropdownItem>
                <DropdownDivider />
                <DropdownItem
                  icon={HiOutlinePower}
                  className="hover:!bg-red-600 dark:hover:!bg-red-800 !my-1.5"
                >
                  خروج
                </DropdownItem>
              </Dropdown>
            </ThemeProvider>
          ) : (
            <ThemeProvider theme={customTheme}>
              <Dropdown
                label={<PiUser className="w-5 h-5" />}
                placement="bottom-start"
                size="sm"
                dismissOnClick={false}
              >
                <DropdownHeader>
                  <img
                    src={`${
                      user?.profilePicture
                        ? user?.profilePicture
                        : "/images/user.jpg"
                    }`}
                    alt={user?.name}
                    loading="lazy"
                    className="w-10 h-10 rounded-full object-cover object-center"
                  />
                  <div className="flex flex-col gap-y-2">
                    <span className="">{user?.name}</span>
                    <span className="truncate font-medium">{user?.phone}</span>
                  </div>
                </DropdownHeader>
                <DropdownDivider />
                <DropdownItem as={Link} to="/admin/dashboard" icon={TbSmartHome}>
                   پیشخوان
                </DropdownItem>
                <DropdownItem
                  as={Link}
                  to="/admin/courses"
                  icon={BsFolder2Open}
                >
                  دوره ها
                </DropdownItem>
                <DropdownItem
                  as={Link}
                  to="/admin/payments"
                  icon={HiOutlineAdjustmentsVertical}
                >
                  جزئیات حساب
                </DropdownItem>
                <DropdownDivider />
                <DropdownItem
                  icon={HiOutlinePower}
                  className="hover:!bg-red-600 dark:hover:!bg-red-800 !my-1.5"
                >
                  خروج
                </DropdownItem>
              </Dropdown>
            </ThemeProvider>
          )}
        </div>
        <HeaderMenu
          isOpen={isDrawerOpen}
          setIsOpen={setIsDrawerOpen}
          setIsModalOpen={setIsModalOpen}
        />
        <ShoppingMenu
          isOpen={isShoppingMenuOpen}
          setIsOpen={setIsShoppingMenuOpen}
        />
      </div>
      {isModalOpen && (
        <Modal title="ورود یا ثبت نام" onClose={() => setIsModalOpen(false)}>
          <AuthContainer onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </>
  );
}

export default Header;
