import { Link } from "react-router-dom";
import CustomNavlink from "./CustomNavlink";
import { MdSignalCellularAlt2Bar } from "react-icons/md";

function Header() {
  return (
    <div className="flex items-center justify-between border-b border-light-shade-yellow">
      <div className="flex items-center gap-x-2">
        {/* Brand Logo */}
        <Link to="/" className="">
          <img
            src="images/Logo.jpg"
            alt=""
            className="h-16 w-16 rounded-r-lg"
          />
        </Link>
        {/* Header Navbar */}
        <ul className="flex items-center gap-x-6 text-xs ml-2">
          <li>
            <CustomNavlink to="/home">همه دوره ها</CustomNavlink>
          </li>
          <li>
            <CustomNavlink to="/home">آثار هنرجویان</CustomNavlink>
          </li>
          <li>
            <CustomNavlink to="/home">اخبار و رویداد ها</CustomNavlink>
          </li>
          <li>
            <CustomNavlink to="/home">درباره ما</CustomNavlink>
          </li>
          <li>
            <CustomNavlink to="/home">تماس با ما</CustomNavlink>
          </li>
        </ul>
      </div>
      {/* Login or Sign up button */}
      <button className="ml-2 btn">
        <MdSignalCellularAlt2Bar className="w-5 h-5" />
        <span>ورود|عضویت</span>
      </button>
    </div>
  );
}

export default Header;
