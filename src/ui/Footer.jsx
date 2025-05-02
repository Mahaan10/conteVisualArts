import { FaTelegramPlane, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BsTelephone } from "react-icons/bs";
import { MdOutlineMailOutline } from "react-icons/md";
import { toPersianNumbers } from "../utils/toPersianNumbers";

function Footer() {
  const socialLinks = [
    { id: 1, icon: <FaInstagram className="w-6 h-6" />, to: "" },
    { id: 2, icon: <FaWhatsapp className="w-6 h-6" />, to: "" },
    { id: 3, icon: <FaTelegramPlane className="w-6 h-6" />, to: "" },
  ];

  return (
    <div className="dark:bg-twilight bg-sand/50 text-black">
      <div className="p-10 container">
        {/* Logo and Social Link */}
        <div className="flex items-center justify-between">
          <div className="">
            <img
              src="images/IMG_20250427_165334_993.jpg"
              alt=""
              className="w-36 h-36"
            />
          </div>
          {/* Social Links */}
          <div className="flex items-center gap-2.5">
            {socialLinks.map((social) => (
              <Link
                key={social.id}
                to={social.to}
                className="bg-mindaro border-strong-yellow rounded-full p-3 hover:bg-sand text-slate-900 transition-colors duration-300 border dark:bg-dark-violet dark:border-dark-purple dark:hover:bg-dark-purple dark:hover:text-neutral-200 hover:border-slate-900"
              >
                {social.icon}
              </Link>
            ))}
          </div>
        </div>
        {/* Contact */}
        <div className="flex items-center justify-start gap-6 pt-8 pb-3 border-b border-neutral-200/10 text-lg">
          <div className="flex items-center gap-2 text-2xl">
            <BsTelephone className="w-5 h-5" />
            <span>{toPersianNumbers(2165423781)}</span>
          </div>
          <div className="flex items-center gap-2">
            <MdOutlineMailOutline className="w-5 h-5" />
            <span>infoConte@gmail.com</span>
          </div>
        </div>
        {/* Quick Access */}
        <div className="flex items-center justify-between pt-3">
          <div className="flex flex-col items-center">
            <p className="font-black text-3xl mb-2">دسترسی سریع</p>
            <ul className="flex flex-col items-center justify-start text-lg opacity-70 font-bold">
              <li>
                <Link to="">قوانین و مقررات</Link>
              </li>
              <li>
                <Link to="">ارسال تیکت</Link>
              </li>
              <li>
                <Link to="">همه دوره ها</Link>
              </li>
            </ul>
          </div>
          {/* Fav Courses */}
          <div className="flex flex-col items-center">
            <p className="font-black text-3xl mb-2">دوره های محبوب</p>
            <ul className="flex flex-col items-center justify-start text-lg opacity-70 font-bold">
              <li>
                <Link to="">آموزش سبک سورئالیسم</Link>
              </li>
              <li>
                <Link to="">آموزش سبک رئالیسم</Link>
              </li>
              <li>
                <Link to="">آموزش سبک رئالیسم به سبک استاد ونگوگ</Link>
              </li>
            </ul>
          </div>
          {/* Banner */}
          <div className="flex items-center gap-4">
            <div className="">
              <img src="images/zarin.png" alt="" className="w-32 h-32" />
            </div>
            <div className="">
              <img src="images/enamad.png" alt="" className="w-32 h-32" />
            </div>
          </div>
        </div>
        <h1 className="text-right font-black text-lg mt-6">
          &copy;کلیه ححقوق مادی و معنوی متعلق به آموزشگاه کنته می باشد.
        </h1>
      </div>
    </div>
  );
}

export default Footer;
