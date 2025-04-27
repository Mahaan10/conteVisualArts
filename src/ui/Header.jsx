import { Link } from "react-router-dom";
import CustomNavlink from "./CustomNavlink";
import { BsSun } from "react-icons/bs";
import { HiOutlineShoppingBag } from "react-icons/hi";

function Header() {
  return (
    <div className="flex flex-col bg-[url('hero-section.webp')] min-h-screen bg-center bg-no-repeat bg-cover text-neutral-200">
      {/* Header Navbar */}
      <div className="flex items-center justify-around">
        {/* Right Section */}
        <ul className="flex items-center gap-x-6">
          <li>
            <Link to="/">
              <img
                src="IMG_20250427_165334_993.jpg"
                alt=""
                className="w-20 h-20"
              />
            </Link>
          </li>
          <li>
            <CustomNavlink to="">همه دوره ها</CustomNavlink>
          </li>
          <li>
            <CustomNavlink to="">درباره ما</CustomNavlink>
          </li>
        </ul>
        {/* Left Section */}
        <div className="flex items-center gap-x-6">
          <button>
            <BsSun className="w-6 h-6" />
          </button>
          <button>
            <HiOutlineShoppingBag className="w-6 h-6" />
          </button>
          <Link to="" className="">
            ورود|عضویت
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
