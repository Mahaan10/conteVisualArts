import { PiMagnifyingGlassBold } from "react-icons/pi";
import HomePageCourses from "../ui/HomePageCourses";
import HomePageNewsSection from "../ui/HomePageNewsSection";
import useCourses from "../hooks/useCourses";
import { useToast } from "../context/useToastContext";
import Loading from "../ui/Loading";
import useNews from "../hooks/useNews";
import useStudentWorks from "../hooks/useStudentWorks";
import HomePageStudentWorks from "../ui/HomePageStudentWorks";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

function Home() {
  const { error, isError, isLoading, courses } = useCourses();
  const {
    error: newsError,
    isError: newsIsError,
    isLoading: isNewsLoading,
    news,
  } = useNews();
  const {
    isLoading: studentWorksLoading,
    isError: studentWorksIsError,
    error: studentWorksError,
    studentWorks,
  } = useStudentWorks();

  const { showToast } = useToast();

  useEffect(() => {
    AOS.init({
      duration: 1500,
      easing: "ease-in",
      once: true,
      delay: 300,
    });
  }, []);

  if (isLoading || isNewsLoading || studentWorksLoading) return <Loading />;
  if (isError || newsIsError || studentWorksIsError)
    return showToast(
      "error",
      (error || newsError || studentWorksError)?.response?.data?.message ||
        "بارگذاری با خطا مواجه شد"
    );

  return (
    <div className="p-8 h-auto">
      <div className="w-full h-full mx-auto flex-1 relative">
        <div className="aspect-auto">
          <img
            src="images/photo_2025-05-08_00-14-50 (2).jpg"
            alt=""
            className="rounded-lg w-auto mx-auto h-auto"
            loading="lazy"
            data-aos="zoom-in"
          />
        </div>
        <div className="font-hoda mr-4 absolute top-1/3 md:top-1/3 text-whitesmoke">
          <h1
            className="text-2xl md:text-5xl bg-clip-text font-black"
            data-aos="fade-right"
          >
            کُنته، جایی برای تجلی هنر
          </h1>
          <h1 className="text-base mt-8 md:mt-14" data-aos="fade-left">
            با آموزشگاه هنر های تجسمی کُنته، مسیر هنر رو تجربه کن
          </h1>
          <div className="mt-8 md:mt-14 mx-auto relative">
            <input
              type="text"
              className="inputTextField"
              placeholder="جستجو در بین دوره ها ..."
              data-aos="flip-down"
            />
            <button className="cursor-pointer absolute top-1.5 md:top-3.5 p-2 md:p-3 text-black dark:text-whitesmoke hover:bg-golden-sand dark:hover:bg-purple-plumeria left-4 bg-almond-cookie dark:bg-dark-cerulean rounded-full transition-colors duration-300">
              <PiMagnifyingGlassBold className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
      <div className="mt-10 overflow-hidden max-w-full">
        <HomePageCourses courses={courses} />
      </div>
      {/* Student Works */}
      <div
        className="border-t border-almond-cookie/50 dark:border-moderate-violet/20 mt-10"
        data-aos="fade-right"
        data-aos-easing="ease-in-out"
        data-aos-duration="1500"
      ></div>
      <div className="mt-10 overflow-hidden max-w-full">
        <HomePageStudentWorks studentWorks={studentWorks} />
      </div>
      {/* News and Events */}
      <div
        className="border-t border-almond-cookie/50 dark:border-moderate-violet/20 mt-10"
        data-aos="fade-right"
        data-aos-easing="ease-in-out"
        data-aos-duratin="2000"
      ></div>
      <div className="mt-10 overflow-hidden max-w-full">
        <HomePageNewsSection news={news} />
      </div>
    </div>
  );
}

export default Home;
