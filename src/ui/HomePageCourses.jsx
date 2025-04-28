import { Link } from "react-router-dom";
import { FiArrowUpLeft } from "react-icons/fi";

function HomePageCourses() {
  return (
    <div className="bg-slate-900 p-6">
      <div className="mt-10 relative">
        <h1 className="opacity-70 text-xl">آخرین دوره های ما</h1>
        <div className="sectionTitle"></div>
      </div>
      <div className="flex items-center justify-between mt-3">
        <h1 className="text-3xl  font-black">سکوی پرتاب به سمت موفقیت</h1>
        <Link
          to=""
          className="flex items-center gap-x-2 hover:text-sand font-extrabold"
        >
          <span className="text-lg">همه دوره ها</span>
          <FiArrowUpLeft className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}

export default HomePageCourses;
