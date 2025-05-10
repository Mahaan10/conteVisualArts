import { FiArrowLeft, FiArrowRight, FiArrowUpLeft } from "react-icons/fi";
import { IoCalendar } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";
import { Link } from "react-router-dom";

function HomePageNewsSection() {
  const news = [
    {
      id: 1,
      image: "images/812798_23813-NURJJK.jpg",
      title: "شروع دوره نقاشی چهره",
      description:
        "ما تو دنیایی زندگی میکنیم که همه چیز با دید هنری زیباتر و بهتر دیده میشه. چشم ها اسلحه ما برای فتح جنگ با دنیای زشت هستند.",
      master: "ماهان توکلی",
      num: 128,
      date: "1404/06/05",
    },
    {
      id: 2,
      image: "images/nature.jpg",
      title: "شروع دوره نقاشی طبیعت",
      description:
        "ما تو دنیایی زندگی میکنیم که همه چیز با دید هنری زیباتر و بهتر دیده میشه. چشم ها اسلحه ما برای فتح جنگ با دنیای زشت هستند.",
      master: "کیارش فیاض",
      num: 257,
      date: "1404/04/10",
    },
    {
      id: 3,
      image: "images/4523044_2384322.jpg",
      title: "آموزش سبک رئالیسم به سبک ونگوگ",
      description:
        "ما تو دنیایی زندگی میکنیم که همه چیز با دید هنری زیباتر و بهتر دیده میشه. چشم ها اسلحه ما برای فتح جنگ با دنیای زشت هستند.",
      master: "رضا توکلی",
      num: 967,
      date: "1404/07/20",
    },
    {
      id: 4,
      image: "images/halftone-monochrome-collage.jpg",
      title: "آموزش سبک رئالیسم",
      description:
        "ما تو دنیایی زندگی میکنیم که همه چیز با دید هنری زیباتر و بهتر دیده میشه. چشم ها اسلحه ما برای فتح جنگ با دنیای زشت هستند.",
      master: "کیارش فیاض",
      num: 361,
      date: "1404/09/15",
    },
  ];

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
      <div className="grid grid-row-2 grid-cols-1 min-[400px]:grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-7 mt-10">
        {news.map((coursesNews) => (
          <div
            key={coursesNews.id}
            className="bg-slate-800 rounded-lg flex flex-col"
          >
            {/* Course Image */}
            <div className="w-full">
              <img
                src={coursesNews.image}
                alt=""
                className="w-full h-44 rounded-t-lg"
              />
            </div>
            {/* Course Title and Description */}
            <div className="flex-grow px-4.5 py-4">
              <h1 className="line-clamp-2 text-base font-bold mb-3">
                {coursesNews.title}
              </h1>
              <p className="opacity-65 text-xs font-bold line-clamp-2">
                {coursesNews.description}
              </p>
            </div>
            {/* Course Master and num of attendence */}
            <div className="flex items-center justify-between px-4.5 py-1.5 border-t border-neutral-200/10">
              <Link
                to=""
                className="my-1 flex items-center justify-center gap-1 hover:text-sand cursor-pointer"
              >
                <FaRegUser className="w-4 h-4" />
                <span className="text-xs opacity-80 font-bold">
                  {coursesNews.master}
                </span>
              </Link>
              <div className="flex items-center justify-center gap-x-1">
                <IoCalendar className="w-4 h-4" />
                <span className="text-[10px]">{coursesNews.date}</span>
              </div>
            </div>
            {/* Course submit */}
            <div className="w-full text-center">
              <button className="btn text-xs font-bold !rounded-t-none !py-3">
                ثبت نام
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePageNewsSection;
