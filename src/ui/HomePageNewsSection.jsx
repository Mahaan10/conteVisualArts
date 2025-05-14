import { Button, Card, createTheme, ThemeProvider } from "flowbite-react";
import { FiArrowLeft, FiArrowRight, FiArrowUpLeft } from "react-icons/fi";
import { FaArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";

const customTheme = createTheme({
  card: {
    root: {
      base: "border-gray-300 bg-gray-100 shadow-xl dark:bg-slate-900 dark:shadow-black",
    },
  },
  button: {
    base: "gap-x-3",
    outlineColor: {
      dark: "dark:hover:text-whitesmoke cursor-pointer transition-colors duration-300 text-xs",
    },
  },
});

function HomePageNewsSection() {
  const news = [
    {
      id: 1,
      //image: "images/812798_23813-NURJJK.jpg",
      title: "تغییر تاریخ شروع دوره نقاشی چهره",
      description:
        "ما تو دنیایی زندگی میکنیم که همه چیز با دید هنری زیباتر و بهتر دیده میشه. چشم ها اسلحه ما برای فتح جنگ با دنیای زشت هستند.",
      master: "ماهان توکلی",
      //num: 128,
      date: "1404/06/05",
    },
    {
      id: 2,
      //image: "images/nature.jpg",
      title: "جشنواره گالری نقاشی سبک مدرنیسم",
      description:
        "ما تو دنیایی زندگی میکنیم که همه چیز با دید هنری زیباتر و بهتر دیده میشه. چشم ها اسلحه ما برای فتح جنگ با دنیای زشت هستند.",
      master: "کیارش فیاض",
      //num: 257,
      date: "1404/04/10",
    },
    {
      id: 3,
      //image: "images/4523044_2384322.jpg",
      title: "شروع ثبت نام سبک رئالیسم به سبک ونگوگ",
      description:
        "ما تو دنیایی زندگی میکنیم که همه چیز با دید هنری زیباتر و بهتر دیده میشه. چشم ها اسلحه ما برای فتح جنگ با دنیای زشت هستند.",
      master: "رضا توکلی",
      //num: 967,
      date: "1404/07/20",
    },
    {
      id: 4,
      //image: "images/halftone-monochrome-collage.jpg",
      title: "روز جهانی عکاسی",
      description:
        "ما تو دنیایی زندگی میکنیم که همه چیز با دید هنری زیباتر و بهتر دیده میشه. چشم ها اسلحه ما برای فتح جنگ با دنیای زشت هستند.",
      master: "کیارش فیاض",
      //num: 361,
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
      <div className="grid grid-row-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-7 mt-10">
        <ThemeProvider theme={customTheme}>
          {news.map((coursesNews) => (
            <Card key={coursesNews.id} className="max-w-sm">
              <div className="w-full">
                <img
                  src="https://flowbite.com/docs/images/blog/image-1.jpg"
                  alt=""
                  className="w-full h-44 rounded-t-lg"
                />
              </div>
              <div className="flex flex-col grow gap-y-3">
                <div className="flex line-clamp-2">
                  <h5 className="font-semibold text-base tracking-tight">
                    {coursesNews.title}
                  </h5>
                </div>
                <p className="text-left text-[8px]">{coursesNews.date}</p>
                <p className="text-gray-700 dark:text-gray-400 text-xs text-ellipsis overflow-hidden line-clamp-3">
                  {coursesNews.description}
                </p>
              </div>
              <Button color="dark" outline>
                اطلاعات بیشتر
                <FaArrowLeft className="w-4 h-4" />
              </Button>
            </Card>
          ))}
        </ThemeProvider>
      </div>
    </div>
  );
}

export default HomePageNewsSection;
