import { Link } from "react-router-dom";
import { FiArrowUpLeft } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { IoPeopleOutline } from "react-icons/io5";
import CourseCard from "./courseCard";

function HomePageCourses() {
  const lastCourses = [
    {
      id: 1,
      image: "images/spring.webp",
      title: "آموزش سبک سورئالیسم",
      description:
        "ما تو دنیایی زندگی میکنیم که همه چیز با دید هنری زیباتر و بهتر دیده میشه. چشم ها اسلحه ما برای فتح جنگ با دنیای زشت هستند.",
      master: "ماهان توکلی",
      num: 128,
    },
    {
      id: 2,
      image: "images/autumn.webp",
      title: "آموزش سبک رئالیسم",
      description:
        "ما تو دنیایی زندگی میکنیم که همه چیز با دید هنری زیباتر و بهتر دیده میشه. چشم ها اسلحه ما برای فتح جنگ با دنیای زشت هستند.",
      master: "کیارش فیاض",
      num: 257,
    },
    {
      id: 3,
      image: "images/van gog.jpg",
      title: "آموزش سبک رئالیسم به سبک ونگوگ",
      description:
        "ما تو دنیایی زندگی میکنیم که همه چیز با دید هنری زیباتر و بهتر دیده میشه. چشم ها اسلحه ما برای فتح جنگ با دنیای زشت هستند.",
      master: "رضا توکلی",
      num: 967,
    },
    {
      id: 4,
      image: "images/earth.webp",
      title: "آموزش سبک رئالیسم",
      description:
        "ما تو دنیایی زندگی میکنیم که همه چیز با دید هنری زیباتر و بهتر دیده میشه. چشم ها اسلحه ما برای فتح جنگ با دنیای زشت هستند.",
      master: "کیارش فیاض",
      num: 361,
    },
  ];

  return (
    <div className="p-10">
      <div className="container">
        <div className="mt-10 relative">
          <h1 className="opacity-70 text-xl">آخرین دوره های ما</h1>
          <div className="sectionTitle w-28"></div>
        </div>
        <div className="flex items-center justify-between mt-3">
          <h1 className="text-3xl font-black">سکوی پرتاب به سمت موفقیت</h1>
          <Link
            to=""
            className="flex items-center gap-x-2 hover:text-dark-violet dark:hover:text-sand transition-colors duration-300 font-extrabold opacity-75"
          >
            <span className="text-lg">همه دوره ها</span>
            <FiArrowUpLeft className="w-5 h-5" />
          </Link>
        </div>
        {/* Last Courses */}
        <div className="grid grid-row-2 sm:grid-cols-2 lg:grid-cols3 xl:grid-cols-4 gap-6 sm:gap-7 mt-10">
          {lastCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
        {/* Artist Work */}
        <div className="mt-20 relative">
          <h1 className="opacity-70 text-xl">آثار هنرجویان</h1>
          <div className="sectionTitle w-22"></div>
        </div>
        <div className="flex items-center justify-between mt-3">
          <h1 className="text-3xl  font-black">سکوی پرتاب به سمت موفقیت</h1>
          <Link
            to=""
            className="flex items-center gap-x-2 hover:text-dark-violet dark:hover:text-sand transition-colors duration-300 font-extrabold opacity-75"
          >
            <span className="text-lg">همه دوره ها</span>
            <FiArrowUpLeft className="w-5 h-5" />
          </Link>
        </div>
        {/* Last Courses */}
        <div className="grid grid-row-2 sm:grid-cols-2 lg:grid-cols3 xl:grid-cols-4 gap-6 sm:gap-7 mt-10">
          {lastCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePageCourses;
