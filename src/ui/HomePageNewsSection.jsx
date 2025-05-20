import { FiArrowLeft, FiArrowRight, FiArrowUpLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import useNews from "../hooks/useNews";
import { useToast } from "../context/useToastContext";
import Loading from "./Loading";
import NewsCards from "./NewsCards";

function HomePageNewsSection() {
  const { news, isLoading, isError, error } = useNews();
  const { showToast } = useToast();

  if (isLoading) return <Loading />;
  if (isError)
    return showToast(
      "error",
      error?.response?.data?.message || "بارگذاری با خطا مواجه شد"
    );

  return (
    <div className="mt-10">
      <div className="flex items-center justify-between">
        <h1 className="text-lg">اخبار و رویدادها</h1>
        <Link to="/news" className="text-xs flex flex-col items-center gap-y-3">
          <div className="flex items-center gap-x-1 duration-300 transition-colors hover:text-butter-caramel dark:hover:text-moderate-violet">
            <span>اخبار و رویدادها</span>
            <FiArrowUpLeft className="w-5 h-5" />
          </div>
        </Link>
      </div>
      <div className="flex items-center justify-end gap-x-2 mt-2">
        <button className="cursor-pointer p-3 rounded-full border border-almond-cookie dark:border-moderate-violet hover:bg-almond-cookie dark:hover:bg-moderate-violet transition-colors duration-300">
          <FiArrowRight className="w-5 h-5" />
        </button>
        <button className="cursor-pointer p-3 rounded-full border border-almond-cookie dark:border-moderate-violet hover:bg-almond-cookie dark:hover:bg-moderate-violet transition-colors duration-300">
          <FiArrowLeft className="w-5 h-5" />
        </button>
      </div>
      <div className="grid grid-row-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-7 mt-10">
        <NewsCards array={news} />
      </div>
    </div>
  );
}

export default HomePageNewsSection;
