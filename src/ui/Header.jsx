import { Link } from "react-router-dom";
import CustomNavlink from "./CustomNavlink";

function Header() {
  return (
    <div className="flex items-center justify-between">
      {/* Brand Logo */}
      <Link to="/" className="p-1">
        <img src="images/Logo.jpg" alt="" className="h-16 w-16 rounded-r-lg" />
      </Link>
      {/* Header Navbar */}
      <ul className="flex items-center gap-x-6">
        <li>
          <CustomNavlink to="/home">صفحه اصلی</CustomNavlink>
        </li>
      </ul>
    </div>
  );
}

export default Header;
