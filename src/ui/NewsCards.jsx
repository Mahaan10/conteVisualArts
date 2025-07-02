import { Button, Card, createTheme, ThemeProvider } from "flowbite-react";
import { FaArrowLeft, FaRegCalendarCheck } from "react-icons/fa6";
import { BsCalendar2Range } from "react-icons/bs";
import { useState } from "react";
import formattedDate from "../utils/formattedDate";
import { Link } from "react-router-dom";

const customTheme = createTheme({
  card: {
    root: {
      base: "border-gray-300 bg-gray-100 shadow-xl dark:bg-slate-900 dark:shadow-black transition-colors duration-300",
    },
  },
  button: {
    base: "w-full max-w-md mx-auto rounded-lg cursor-pointer gap-x-3",
    outlineColor: {
      dark: "dark:hover:text-whitesmoke hover:text-gray-800 hover:bg-golden-sand transition-colors duration-300 text-xs",
    },
  },
});

function NewsCards({ array }) {
  const [visibleCount, setVisibleCount] = useState(6);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  const visibleNews = array.slice(0, visibleCount);

  return (
    <ThemeProvider theme={customTheme}>
      {visibleNews.map((arr) => (
        <Link
          key={arr._id}
          to={`/news/${arr._id}`}
          className="h-full block"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <Card className="max-w-sm transition-all duration-300">
            <div className="w-full">
              <img
                //src="https://flowbite.com/docs/images/blog/image-1.jpg"
                src={arr.Image}
                alt={arr.title}
                loading="lazy"
                className="w-full h-55 rounded-t-lg"
              />
            </div>
            <div className="flex flex-col grow gap-y-3">
              <div className="line-clamp-2 min-h-[3.2rem]">
                <h5 className="font-semibold text-sm sm:text-base tracking-tight">
                  {arr.title}
                </h5>
              </div>
              <div className="flex text-[10px] space-x-1">
                <FaRegCalendarCheck className="w-4 h-4" />
                <span>تاریخ انتشار:</span>
                <span>{formattedDate(arr.createdAt)}</span>
              </div>
              <div className="flex text-[10px] space-x-1">
                <BsCalendar2Range className="w-4 h-4" />
                <span>تاریخ آپدیت:</span>
                <span>{formattedDate(arr.updatedAt)}</span>
              </div>
              <p className="text-gray-700 dark:text-gray-400 text-xs line-clamp-3 min-h-[3rem]">
                {arr.description}
              </p>
            </div>
            <Button
              color="dark"
              outline
              className="transition-all duration-300"
            >
              اطلاعات بیشتر
              <FaArrowLeft className="w-4 h-4" />
            </Button>
          </Card>
        </Link>
      ))}
      {visibleCount < array.length && (
        <div className="col-span-full flex justify-center mt-6">
          <Button
            onClick={handleLoadMore}
            color="dark"
            outline
            className="text-sm"
          >
            مشاهده اخبار بیشتر
          </Button>
        </div>
      )}
    </ThemeProvider>
  );
}

export default NewsCards;
