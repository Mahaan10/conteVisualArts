import { PiMagnifyingGlassBold } from "react-icons/pi";
import { FiArrowUpLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import HomePageCourses from "../ui/HomePageCourses";
import HomePageNewsSection from "../ui/HomePageNewsSection";
import useCourses from "../hooks/useCourses";
import { useToast } from "../context/useToastContext";
import Loading from "../ui/Loading";
import useNews from "../hooks/useNews";
import useStudentWorks from "../hooks/useStudentWorks";
import HomePageStudentWorks from "../ui/HomePageStudentWorks";

function Home() {
  const { error, isError, isLoading } = useCourses();
  const {
    error: newsError,
    isError: newsIsError,
    isLaoding: isNewsLoading,
  } = useNews();
  const {
    isLaoding: studentWorksLoading,
    isError: studentWorksIsError,
    error: studentWorksError,
  } = useStudentWorks();

  const { showToast } = useToast();

  if (isLoading || isNewsLoading || studentWorksLoading) return <Loading />;
  if (isError || newsIsError || studentWorksIsError)
    return showToast(
      "error",
      (error || newsError || studentWorksError)?.response?.data?.message ||
        "بارگذاری با خطا مواجه شد"
    );

  return (
    <div className="p-8 h-auto">
      <div className="max-w-[980px] mx-auto flex-1 relative">
        <div className=" max-h-[655px] mx-auto">
          <img
            src="images/photo_2025-05-08_00-14-50 (2).jpg"
            alt=""
            className="rounded-lg w-auto mx-auto h-auto"
            loading="lazy"
          />
        </div>
        <div className="font-hoda mr-4 absolute top-1/3 md:top-1/3 text-whitesmoke">
          <h1 className="text-2xl md:text-5xl bg-clip-text font-black">
            کُنته، جایی برای تجلی هنر
          </h1>
          <h1 className="text-base mt-8 md:mt-14">
            با آموزشگاه هنر های تجسمی کُنته، مسیر هنر رو تجربه کن
          </h1>
          <div className="mt-8 md:mt-14 mx-auto relative">
            <input
              type="text"
              className="inputTextField"
              placeholder="جستجو در بین دوره ها ..."
            />
            <button className="cursor-pointer absolute top-1.5 md:top-3.5 p-2 md:p-3 text-black dark:text-whitesmoke hover:bg-golden-sand dark:hover:bg-purple-plumeria left-4 bg-almond-cookie dark:bg-dark-cerulean rounded-full transition-colors duration-300">
              <PiMagnifyingGlassBold className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
      {/* Home Page Courses */}
      <div className="mt-10">
        <div className="flex items-center justify-between">
          <h1 className="text-lg">دوره های محبوب</h1>
          <Link
            to="/courses"
            className="text-xs flex items-center gap-x-1 hover:text-butter-caramel dark:hover:text-moderate-violet transition-colors duration-300"
          >
            <span>همه دوره ها</span>
            <FiArrowUpLeft className="w-5 h-5" />
          </Link>
        </div>
      </div>
      <div className="grid grid-row-2 grid-cols-1 min-[400px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 sm:gap-7 mt-10">
        <HomePageCourses />
      </div>
      {/* Student Works */}
      <div className="border-t border-almond-cookie/50 dark:border-moderate-violet/20 mt-10"></div>
      <div className="mt-10">
        <div className="flex items-center justify-between">
          <h1 className="text-lg">آثار هنرجویان</h1>
          <Link
            to="/student-works"
            className="text-xs flex items-center gap-x-1 hover:text-butter-caramel dark:hover:text-moderate-violet transition-colors duration-300"
          >
            <span>آثار هنرجویان</span>
            <FiArrowUpLeft className="w-5 h-5" />
          </Link>
        </div>
      </div>
      <div className="grid grid-row-2 grid-cols-1 min-[400px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 sm:gap-7 mt-10">
        <HomePageStudentWorks />
      </div>
      {/* News and Events */}
      <div className="border-t border-almond-cookie/50 dark:border-moderate-violet/20 mt-10"></div>
      <HomePageNewsSection />
    </div>
  );
}

export default Home;
