import {
  createTheme,
  Footer,
  FooterBrand,
  FooterCopyright,
  FooterDivider,
  FooterIcon,
  FooterLinkGroup,
  FooterTitle,
  ThemeProvider,
} from "flowbite-react";
import { PiInstagramLogo, PiTelegramLogo } from "react-icons/pi";
import { FaWhatsapp } from "react-icons/fa6";
import useCourses from "../hooks/useCourses";
import { Loader } from "./Loading";
import toast from "react-hot-toast";
import { useThemeMode } from "../context/useThemeModeContext";
import { Link } from "react-router-dom";

const customTheme = createTheme({
  footer: {
    root: {
      base: "!bg-inherit rounded-none",
    },
    groupLink: {
      base: "text-black text-xs sm:text-sm ",
      link: {
        base: "me-4 !mr-0",
        href: "hover:opacity-80 opacity-50 hover:no-underline",
      },
    },
    title: {
      base: "text-xs sm:text-sm text-gray-700 dark:text-whitesmoke",
    },
    brand: {
      img: "mr-0 h-32 w-full",
    },
    icon: {
      base: "text-inherit",
      size: "w-10 h-10 bg-almond-cookie hover:bg-golden-sand dark:hover:bg-purple-plumeria p-2 rounded-full dark:bg-dark-purple",
    },
    copyright: {
      base: "text-xs min-[400px]:text-sm",
    },
  },
});

function FooterSection() {
  const { courses, error, isError, isLoading } = useCourses();
  const { themeMode } = useThemeMode();

  if (isLoading) return <Loader />;
  if (isError) {
    toast.error(error?.response?.data?.message || "خطا در بارگذاری");
    //return null;
  }

  if (courses.length === 0 || !courses) {
    return <div className="text-center mt-4">دوره‌ای یافت نشد</div>;
  }

  const filteredCourses = courses?.filter((c) => c.isActive) || [];

  const slicedCourses = filteredCourses.slice(0, 5);

  return (
    <div className="border-t border-light-shade-yellow dark:border-moderate-violet transition-colors duration-300">
      <div className="flex flex-col overflow-hidden">
        <ThemeProvider theme={customTheme}>
          <Footer container>
            <div className="w-full">
              <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1 px-5 sm:px-10">
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
                  <div>
                    <FooterTitle title="دوره های پرطرفدار" />
                    <FooterLinkGroup col>
                      {slicedCourses.map((course) => (
                        <Link
                          key={course?._id}
                          className="text-black text-xs sm:text-sm me-4 !mr-0 hover:opacity-80 opacity-50 hover:no-underline dark:text-white"
                          to={`/courses/${course?._id}`}
                        >
                          {course?.name}
                        </Link>
                      ))}
                    </FooterLinkGroup>
                  </div>
                  <div>
                    <FooterTitle title="دسترسی سریع و پشتیبانی" />
                    <FooterLinkGroup col>
                      <Link
                        className="text-black text-xs sm:text-sm me-4 !mr-0 hover:opacity-80 opacity-50 hover:no-underline dark:text-white"
                        to="/courses"
                      >
                        همه دوره ها
                      </Link>
                      <Link
                        className="text-black text-xs sm:text-sm me-4 !mr-0 hover:opacity-80 opacity-50 hover:no-underline flex flex-wrap dark:text-white"
                        to="/student-works"
                      >
                        آثار هنرجویان
                      </Link>
                      <Link
                        className="text-black text-xs sm:text-sm me-4 !mr-0 hover:opacity-80 opacity-50 hover:no-underline flex flex-wrap dark:text-white"
                        to="/news"
                      >
                        اخبار و رویدادها
                      </Link>
                      <Link
                        className="text-black text-xs sm:text-sm me-4 !mr-0 hover:opacity-80 opacity-50 hover:no-underline dark:text-white"
                        to="/about"
                      >
                        درباره ما
                      </Link>
                      <Link
                        className="text-black text-xs sm:text-sm me-4 !mr-0 hover:opacity-80 opacity-50 hover:no-underline dark:text-white"
                        to="/contact"
                      >
                        ارتباط با ما
                      </Link>
                      <Link
                        className="text-black text-xs sm:text-sm me-4 !mr-0 hover:opacity-80 opacity-50 hover:no-underline dark:text-white"
                        to="/FAQ"
                      >
                        سوالات متداول(FAQ)
                      </Link>
                      <Link
                        className="text-black text-xs sm:text-sm me-4 !mr-0 hover:opacity-80 opacity-50 hover:no-underline dark:text-white"
                        to="/terms-of-services"
                      >
                        قوانین و مقررات
                      </Link>
                    </FooterLinkGroup>
                  </div>
                  <div className="col-span-full sm:col-span-1">
                    <FooterTitle title="راه های ارتباطی" />
                    <div className="flex flex-col gap-y-4 text-xs sm:text-sm">
                      <div className="flex gap-x-2 opacity-50">
                        <span>تلفن:</span>
                        <a
                          href="tel:+982122264021"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          021-22264021
                        </a>
                      </div>
                      <div className="flex gap-x-2 opacity-50">
                        <span>ایمیل:</span>
                        <a
                          href="mailto:conteschool@yahoo.com"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          conteschool@yahoo.com
                        </a>
                      </div>
                      <div className="flex items-center gap-x-4">
                        <FooterIcon
                          rel="noopener noreferrer"
                          target="_blank"
                          href="https://www.instagram.com/conteschool1393"
                          icon={PiInstagramLogo}
                        />
                        <FooterIcon
                          rel="noopener noreferrer"
                          target="_blank"
                          href="https://t.me/+989125975912"
                          icon={PiTelegramLogo}
                        />
                        <FooterIcon
                          rel="noopener noreferrer"
                          target="_blank"
                          href="https://wa.me/+989125975912"
                          icon={FaWhatsapp}
                        />
                      </div>
                      <div className="flex gap-x-2 opacity-50">
                        <span className="leading-6">آدرس:</span>
                        <p className="leading-6">
                          تهران. شریعتی. قلهک. رو به روی بیمارستان ایرانمهر. کوی
                          مرشدی. پلاک 6. واحد 3
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row sm:flex-col gap-4 mt-4 sm:mt-0 h-32 my-auto justify-center sm:justify-start">
                  <div>
                    <FooterBrand
                      href="/"
                      src={`${
                        themeMode === "light"
                          ? "/images/light.jpg"
                          : "/images/dark-bgg.jpg"
                      }`}
                      alt="Conte Logo"
                      loading="lazy"
                      className="h-32 md:w-28 w-19"
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row items-center justify-between">
                    <img
                      src="/images/zarin.png"
                      alt=""
                      loading="lazy"
                      className="w-12 h-12"
                    />
                    <img
                      src="/images/enamad.jpg"
                      alt=""
                      loading="lazy"
                      className="w-12 h-12"
                    />
                  </div>
                </div>
              </div>
              <FooterDivider />
              <div className="flex gap-y-2 items-center justify-center">
                <FooterCopyright by="کلیه حقوق متعلق به آموزشگاه کًنته می باشد." />
              </div>
            </div>
          </Footer>
        </ThemeProvider>
      </div>
    </div>
  );
}

export default FooterSection;
