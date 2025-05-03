import { Link } from "react-router-dom";
import CustomNavlink from "./CustomNavlink";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { FaRegUser } from "react-icons/fa";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import { useState } from "react";
import Modal from "./Modal";
import MultiStepForm from "./MultiStepForm";
import ThemeMode from "./ThemeMode";
import HeaderMenu from "./HeaderMenu";
import { MdMenu } from "react-icons/md";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const statsInfo = [
    { id: 1, image: "images/degree.png", num: 987, title: "فارغ التحصیل" },
    { id: 2, image: "images/courses.png", num: 32, title: "دوره آموزشی" },
    { id: 3, image: "images/artists.png", num: 1584, title: "هنرجو" },
  ];

  return (
    <div className="flex flex-col relative min-h-screen text-neutral-200">
      {/* Background Image */}
      <div className="bg-[url('images/bg-4.jpg')] inset-0 blur-sm absolute bg-center bg-no-repeat bg-cover"></div>
      {/* Header Menu */}
      <div className="flex items-center justify-between mx-6 z-10">
        <button
          className="md:hidden cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <MdMenu className="w-7 h-7" />
        </button>
        {/* Header Navbar */}
        {/* Brand Logo */}
        <Link to="/" className="p-5">
          <img
            src="images/IMG_20250427_165334_993.jpg"
            alt=""
            className="h-16 w-16"
          />
        </Link>
        <div className="flex items-center justify-between mt-4 md:w-[90%] md:mx-auto font-iran-sans z-10">
          {/* Right Section */}
          <ul className="hidden md:flex items-center gap-x-6 z-10 text-sm">
            <li>
              <CustomNavlink to="/">همه دوره ها</CustomNavlink>
            </li>
            <li>
              <CustomNavlink to="/">درباره ما</CustomNavlink>
            </li>
            <li>
              <CustomNavlink to="/">اخبار و رویداد ها</CustomNavlink>
            </li>
            <li>
              <CustomNavlink to="/">تماس با ما</CustomNavlink>
            </li>
          </ul>

          {/* Left Section */}
          <div className="flex items-center justify-end md:w-auto gap-x-6 z-10">
            <ThemeMode />
            <button className="cursor-pointer">
              <HiOutlineShoppingBag className="w-6 h-6" />
            </button>
            <button
              className="text-sm btn hover:text-black !hidden md:!flex"
              onClick={() => setIsOpen(!isOpen)}
            >
              <FaRegUser className="w-5 h-5" />
              <span>ورود|عضویت</span>
            </button>
          </div>
        </div>
      </div>
      {/* Header Chants */}
      <div className="container z-10 mx-auto">
        <div className="text-center mt-8 sm:mt-14">
          <h1 className="font-black text-xl min-[315px]:max-sm:text-3xl sm:text-5xl bg-clip-text">
            کُنته، جایی برای تجلی هنر
          </h1>
          <h1 className="sm:text-3xl text-sm min-[315px]:max-sm:text-lg mt-8 sm:mt-14">
            با آموزشگاه هنر های تجسمی کُنته، مسیر هنر رو تجربه کن
          </h1>
          <div className="mt-8 sm:mt-14 w-[85%] sm:w-[70%] mx-auto relative">
            <input
              type="text"
              className="textField_input placeholder:text-sm placeholder:min-[315px]:text-base"
              placeholder="جستجو در بین دوره ها ..."
            />
            <button className="cursor-pointer absolute top-3.5 p-3 dark:text-neutral-200 left-4 bg-soft-yellow text-black dark:bg-twilight rounded-full">
              <PiMagnifyingGlassBold className="w-6 h-6" />
            </button>
          </div>
        </div>
        {/* Stats Section */}
        <ul className="flex items-center justify-center min-[360px]:gap-x-10 gap-x-2 mt-8 sm:mt-10  mx-auto mb-10">
          {statsInfo.map((stat) => (
            <li key={stat.id} className="space-y-1.5 text-center">
              <div className="mx-1 min-[315px]:mx-0">
                <img src={stat.image} alt="" className="w-24 h-24" />
              </div>
              <p className="sm:text-4xl text-xl min-[315px]:max-sm:text-2xl bg-clip-text font-black">
                {stat.num}
              </p>
              <p className="min-[200px]:max-[315px]:text-base min-[315px]:text-2xl text-nowrap">
                {stat.title}
              </p>
            </li>
          ))}
        </ul>
        {/* Header Menu */}
        <HeaderMenu
          open={open}
          onClose={() => setOpen(false)}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
        />
      </div>
      {/* Login Section */}
      {isOpen && (
        <Modal title="ورود یا ثبت نام" onClose={() => setIsOpen(!isOpen)}>
          <MultiStepForm setIsOpen={setIsOpen} />
        </Modal>
      )}
    </div>
  );
}

export default Header;
