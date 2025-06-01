import { PiMagnifyingGlassBold } from "react-icons/pi";
import HomePageCourses from "../ui/HomePageCourses";
import HomePageNewsSection from "../ui/HomePageNewsSection";
import useCourses from "../hooks/useCourses";
import { useToast } from "../context/useToastContext";
import Loading from "../ui/Loading";
import useNews from "../hooks/useNews";
import useStudentWorks from "../hooks/useStudentWorks";
import HomePageStudentWorks from "../ui/HomePageStudentWorks";

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
      <div className="mt-10 overflow-hidden max-w-full">
        <HomePageCourses courses={courses} />
      </div>
      {/* Student Works */}
      <div className="border-t border-almond-cookie/50 dark:border-moderate-violet/20 mt-10"></div>
      <div className="mt-10 overflow-hidden max-w-full">
        <HomePageStudentWorks studentWorks={studentWorks} />
      </div>
      {/* News and Events */}
      <div className="border-t border-almond-cookie/50 dark:border-moderate-violet/20 mt-10"></div>
      <div className="mt-10 overflow-hidden max-w-full">
        <HomePageNewsSection news={news} />
      </div>
    </div>
  );
}

export default Home;
