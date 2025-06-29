import { Link } from "react-router-dom";
import {
  createTheme,
  Footer,
  FooterBrand,
  FooterCopyright,
  FooterDivider,
  FooterIcon,
  FooterLink,
  FooterLinkGroup,
  FooterTitle,
  ThemeProvider,
} from "flowbite-react";
import { PiInstagramLogo, PiTelegramLogo } from "react-icons/pi";
import { FaWhatsapp } from "react-icons/fa6";
import useCourses from "../hooks/useCourses";
import { Loader } from "./Loading";
import { useToast } from "../context/useToastContext";

const customTheme = createTheme({
  footer: {
    root: {
      base: "!bg-inherit rounded-none",
    },
    groupLink: {
      base: "text-black text-xs sm:text-sm",
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
  const { showToast } = useToast();

  if (isLoading) return <Loader />;
  if (isError)
    return showToast(
      "error",
      error?.response?.data?.message || "خطا در بارگذاری"
    );

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
                        <FooterLink
                          key={course._id}
                          href={`/courses/${course._id}`}
                        >
                          {course.name}
                        </FooterLink>
                      ))}
                    </FooterLinkGroup>
                  </div>
                  <div>
                    <FooterTitle title="دسترسی سریع و پشتیبانی" />
                    <FooterLinkGroup col>
                      <FooterLink href="/courses">همه دوره ها</FooterLink>
                      <FooterLink href="/student-works">
                        آثار هنرجویان
                      </FooterLink>
                      <FooterLink href="/news">اخبار و رویدادها</FooterLink>
                      <FooterLink href="/about">درباره ما</FooterLink>
                      <FooterLink href="/contact">ارتباط با ما</FooterLink>
                      <FooterLink href="/courses/portrait">
                        سوالات متداول(FAQ)
                      </FooterLink>
                      <FooterLink href="/courses/portrait">
                        قوانین و مقررات
                      </FooterLink>
                    </FooterLinkGroup>
                  </div>
                  {/* <div>
                    <FooterTitle title="راهنما و پشتیبانی" />
                    <FooterLinkGroup col>
                      <FooterLink href="/courses/portrait">
                        سوالات متداول(FAQ)
                      </FooterLink>
                      <FooterLink href="/courses/portrait">
                        قوانین و مقررات
                      </FooterLink>
                    </FooterLinkGroup>
                  </div> */}
                  <div>
                    <FooterTitle title="راه های ارتباطی" />
                    <div className="flex flex-col gap-y-4 text-xs sm:text-sm">
                      <div className="flex gap-x-2 opacity-50">
                        <span>تلفن:</span>
                        <Link
                          to="tel:+9802166957831"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          021-66957831
                        </Link>
                      </div>
                      <div className="flex gap-x-2 opacity-50">
                        <span>فکس:</span>
                        <Link to="">021-66958237</Link>
                      </div>
                      <div className="flex gap-x-2 opacity-50">
                        <span>ایمیل:</span>
                        <Link
                          to="mailto:conteschool@yahoo.com"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          conteschool@yahoo.com
                        </Link>
                      </div>
                      <div className="flex items-center gap-x-4">
                        <FooterIcon href="/courses" icon={PiInstagramLogo} />
                        <FooterIcon href="/courses" icon={PiTelegramLogo} />
                        <FooterIcon href="/courses" icon={FaWhatsapp} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row sm:flex-col gap-4 mt-4 sm:mt-0 h-32 my-auto">
                  <div>
                    <FooterBrand
                      href="/"
                      src="/images/Logo.jpg"
                      alt="Conte Logo"
                      loading="lazy"
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
