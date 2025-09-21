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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFilter } from "../context/FilterContext";

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
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const { updateSearch } = useFilter();

  const topRatedCourses = courses?.length
    ? [...courses]
        .sort((a, b) => b.ratingsAverage - a.ratingsAverage)
        .slice(0, 8)
    : [];

  const showingNews = news?.length ? [...news].slice(0, 5) : [];
  const showingStudentWorks = studentWorks?.length
    ? [...studentWorks].slice(0, 8)
    : [];

  useEffect(() => {
    AOS.init({
      duration: 1500,
      easing: "ease-in",
      once: true,
      delay: 300,
    });
  }, []);

  useEffect(() => {
    if (isError || newsIsError || studentWorksIsError) {
      showToast(
        "error",
        (error || newsError || studentWorksError)?.response?.data?.message ||
          "بارگذاری با خطا مواجه شد"
      );
    }
  }, [
    isError,
    newsIsError,
    studentWorksIsError,
    error,
    newsError,
    studentWorksError,
    showToast,
  ]);

  const handleSearch = () => {
    if (!searchValue.trim()) return;
    updateSearch(searchValue);
    navigate("/courses");
  };

  if (isLoading || isNewsLoading || studentWorksLoading) return <Loading />;

  return (
    <div className="p-2 sm:p-4 md:p-8 h-auto max-w-screen-xl mx-auto">
      <div className="relative w-full min-h-screen">
        {/* بک‌گراند عکس تمام صفحه */}
        <img
          src="images/6.jpg"
          alt=""
          className="absolute inset-0 w-full h-full z-0 rounded-lg object-cover"
          loading="lazy"
          data-aos="zoom-in"
        />

        {/* لایه‌ی محتوای روی عکس */}
        <div className="absolute z-10 flex flex-col justify-center items-start h-full p-4 sm:p-8 text-whitesmoke font-hoda top-[20%] sm:top-[15%] md:top-[5%]">
          <h1
            className="text-lg sm:text-2xl md:text-5xl font-black"
            data-aos="fade-right"
          >
            کُنته، جایی برای تجلی هنر
          </h1>
          <h2
            className="text-[10px] sm:text-sm md:text-2xl mt-2 md:mt-6"
            data-aos="fade-left"
          >
            با آموزشگاه هنر های تجسمی کُنته، مسیر هنر را تجربه کن
          </h2>

          <div
            className="mt-3 sm:mt-5 md:mt-10 relative w-full max-w-md"
            data-aos="flip-down"
          >
            <input
              type="text"
              className={`inputTextField w-full ${
                searchValue.trim() ? "font-iran-marker text-sm" : "text-sm"
              }`}
              placeholder="جستجو در بین دوره ها ..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
            />
            <button
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 text-black dark:text-whitesmoke hover:bg-golden-sand dark:hover:bg-purple-plumeria bg-almond-cookie dark:bg-dark-cerulean rounded-full transition-colors duration-300 cursor-pointer"
              onClick={handleSearch}
            >
              <PiMagnifyingGlassBold className="md:size-6 size-4 sm:size-5" />
            </button>
          </div>
        </div>
      </div>
      {/* News and Events */}
      <div className="mt-10 overflow-hidden max-w-full">
        <HomePageNewsSection news={showingNews} />
      </div>
      {/* Popular Courses */}
      <div
        className="border-t border-almond-cookie/50 dark:border-moderate-violet/20 mt-10"
        data-aos="fade-right"
        data-aos-easing="ease-in-out"
        data-aos-duration="2000"
      ></div>
      <div className="mt-10 overflow-hidden max-w-full">
        <HomePageCourses courses={topRatedCourses} />
      </div>
      {/* Student Works */}
      <div
        className="border-t border-almond-cookie/50 dark:border-moderate-violet/20 mt-10"
        data-aos="fade-right"
        data-aos-easing="ease-in-out"
        data-aos-duration="1500"
      ></div>
      <div className="mt-10 overflow-hidden max-w-full">
        <HomePageStudentWorks studentWorks={showingStudentWorks} />
      </div>
    </div>
  );
}

export default Home;
