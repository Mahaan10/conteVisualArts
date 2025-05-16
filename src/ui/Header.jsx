import { Link } from "react-router-dom";
import CustomNavlink from "./CustomNavlink";
import { MdSignalCellularAlt2Bar } from "react-icons/md";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import ThemeMode from "./ThemeMode";
import HeaderMenu from "./HeaderMenu";
import { useState } from "react";
import { IoMenuOutline } from "react-icons/io5";
import Modal from "./Modal";
//import useUsers from "../hooks/useUsers";
import AuthContainer from "../features/authentication/AuthContainer";

function Header() {
  /* const { users, isLoading, isError, error } = useUsers();
  console.log(users); */
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div className="flex items-center justify-between border-b border-light-shade-yellow dark:border-moderate-violet transition-colors duration-300">
        {/* Header Menu */}
        <button
          className="md:hidden block mr-5 cursor-pointer"
          onClick={() => setIsDrawerOpen(!isDrawerOpen)}
        >
          <IoMenuOutline className="w-8 h-8" />
        </button>
        <div className="flex items-center justify-center">
          {/* Brand Logo */}
          <Link to="/" className="ml-2">
            <img
              src="images/Logo.jpg"
              alt=""
              className="h-16 w-16 md:rounded-tr-lg"
            />
          </Link>
          {/* Header Navbar */}
          <ul className="hidden md:flex items-center gap-x-6 text-xs ml-2">
            <li>
              <CustomNavlink to="/courses">همه دوره ها</CustomNavlink>
            </li>
            <li>
              <CustomNavlink to="/artists-work">آثار هنرجویان</CustomNavlink>
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
        <div className="flex items-center justify-between gap-x-2 md:gap-x-4 md:ml-5 ml-3.5">
          {/* Theme Mode buttons */}
          <ThemeMode />
          {/* Shopping Card button */}
          <button className="cursor-pointer bg-almond-cookie p-2 rounded-full dark:bg-dark-cerulean hover:bg-golden-sand dark:hover:bg-purple-plumeria transition-colors duration-300">
            <HiOutlineShoppingBag className="w-5 h-5" />
          </button>
          {/* Login or Sign up button */}
          <button
            className="btn md:flex hidden"
            onClick={() => setIsModalOpen(!isModalOpen)}
          >
            <MdSignalCellularAlt2Bar className="w-5 h-5" />
            <span>ورود|عضویت</span>
          </button>
        </div>
        <HeaderMenu
          isOpen={isDrawerOpen}
          setIsOpen={setIsDrawerOpen}
          setIsModalOpen={setIsModalOpen}
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
