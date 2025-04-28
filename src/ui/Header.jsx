import { Link } from "react-router-dom";
import CustomNavlink from "./CustomNavlink";
import { BsSun } from "react-icons/bs";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { FaRegUser } from "react-icons/fa";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import { toPersianNumbers } from "../utils/toPersianNumbers";

function Header() {
  const statsInfo = [
    { id: 1, image: "images/degree.png", num: 987, title: "فارغ التحصیل" },
    { id: 2, image: "images/courses.png", num: 32, title: "دوره آموزشی" },
    { id: 3, image: "images/artists.png", num: 1584, title: "هنرجو" },
  ];

  return (
    <div className="flex flex-col relative min-h-screen">
      {/* Background Image */}
      <div className="bg-[url('images/bg-4.jpg')] inset-0 blur-sm absolute bg-center bg-no-repeat bg-cover"></div>
      {/* Header Navbar */}
      <div className="flex items-center justify-between mt-4 w-[90%] mx-auto font-iran-sans z-10">
        {/* Right Section */}
        <ul className="flex items-center gap-x-6 z-10">
          <li>
            <Link to="/">
              <img
                src="images/IMG_20250427_165334_993-removebg-preview 2.png"
                alt=""
                className="h-16 w-10"
              />
            </Link>
          </li>
          <li>
            <CustomNavlink to="">همه دوره ها</CustomNavlink>
          </li>
          <li>
            <CustomNavlink to="">درباره ما</CustomNavlink>
          </li>
          <li>
            <CustomNavlink to="">مقالات</CustomNavlink>
          </li>
        </ul>
        {/* Left Section */}
        <div className="flex items-center gap-x-6 z-10">
          <button className="cursor-pointer">
            <BsSun className="w-6 h-6" />
          </button>
          <button className="cursor-pointer">
            <HiOutlineShoppingBag className="w-6 h-6" />
          </button>
          <Link to="" className="btn text-sm">
            <FaRegUser className="w-5 h-5" />
            <span>ورود|عضویت</span>
          </Link>
        </div>
      </div>
      {/* Header Chants */}
      <div className="container z-10">
        <div className="text-center mt-8 sm:mt-14">
          <h1 className="font-black text-5xl bg-clip-text">
            کُنته، جایی برای تجلی هنر
          </h1>
          <h1 className="text-3xl mt-8 sm:mt-14">
            با آموزشگاه هنر های تجسمی کُنته، مسیر هنر رو تجربه کن
          </h1>
          <div className="mt-8 sm:mt-14 w-[85%] sm:w-[70%] mx-auto relative">
            <input
              type="text"
              className="textField_input"
              placeholder="جستجو در بین دوره ها ..."
            />
            <button className="cursor-pointer absolute top-3.5 p-3 dark:text-neutral-200 left-4 bg-twilight rounded-full">
              <PiMagnifyingGlassBold className="w-6 h-6" />
            </button>
          </div>
        </div>
        {/* Stats Section */}
        <ul className="flex items-center justify-between mt-8 sm:mt-10 w-[60%] mx-auto mb-10">
          {statsInfo.map((stat) => (
            <li key={stat.id} className="space-y-1.5 text-center">
              <div className="">
                <img src={stat.image} alt="" className="w-24 h-24" />
              </div>
              <p className="text-4xl bg-clip-text font-black">
                {toPersianNumbers(stat.num)}
              </p>
              <p className="text-2xl">{stat.title}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Header;
