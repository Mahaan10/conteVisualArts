import { Button, Card, createTheme, ThemeProvider } from "flowbite-react";
import { FaArrowLeft, FaRegCalendarCheck } from "react-icons/fa6";
import { BsCalendar2Range } from "react-icons/bs";
import { useState } from "react";

const customTheme = createTheme({
  card: {
    root: {
      base: "border-gray-300 bg-gray-100 shadow-xl dark:bg-slate-900 dark:shadow-black transition-colors duration-300",
    },
  },
  button: {
    base: "gap-x-3",
    outlineColor: {
      dark: "dark:hover:text-whitesmoke cursor-pointer transition-colors duration-300 text-xs",
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
        <Card
          key={arr._id}
          className="max-w-sm transition-all duration-300"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <div className="w-full">
            <img
              //src="https://flowbite.com/docs/images/blog/image-1.jpg"
              src={arr.image}
              alt={arr.title}
              loading="lazy"
              className="w-full h-44 rounded-t-lg"
            />
          </div>
          <div className="flex flex-col grow gap-y-3">
            <div className="flex line-clamp-2">
              <h5 className="font-semibold text-base tracking-tight">
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
            <p className="text-gray-700 dark:text-gray-400 text-xs text-ellipsis overflow-hidden line-clamp-3">
              {arr.description}
            </p>
          </div>
          <Button color="dark" outline className="transition-all duration-300">
            اطلاعات بیشتر
            <FaArrowLeft className="w-4 h-4" />
          </Button>
        </Card>
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

function formattedDate(isoString) {
  return new Date(isoString).toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}
