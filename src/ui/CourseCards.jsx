import {
  Button,
  Card,
  createTheme,
  Rating,
  RatingStar,
  ThemeProvider,
} from "flowbite-react";
import { FaArrowLeft, FaRegCalendarCheck } from "react-icons/fa6";
import { PiStudent } from "react-icons/pi";
import { Link } from "react-router-dom";

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

function CourseCards({ array }) {
  const sortedArray = [...array].sort((a, b) => b.isActive - a.isActive);

  return (
    <ThemeProvider theme={customTheme}>
      {sortedArray.map((arr) => (
        <Link
          key={arr._id}
          to={`/courses/${arr.slug}`}
          className="h-full block"
        >
          <Card
            className={`h-full flex flex-col justify-between transition-all duration-300 relative ${
              !arr.isActive && "cursor-not-allowed grayscale-75 opacity-50"
            }`}
          >
            {!arr.isActive && (
              <span className="absolute top-2 left-2 bg-red-500 text-whitesmoke text-xs px-2 py-1 rounded z-10">
                تکمیل ظرفیت
              </span>
            )}
            <span className="absolute top-2 right-2 bg-transparent px-2 py-1 z-10">
              <Rating>
                <RatingStar />
                <RatingStar />
                <RatingStar />
                <RatingStar />
                <RatingStar filled={false} />
              </Rating>
            </span>

            <div className="w-full">
              <img
                src={arr.Image}
                alt={arr.name}
                loading="lazy"
                className="w-full h-44 rounded-t-lg object-cover"
              />
            </div>

            <div className="flex flex-col flex-grow gap-y-3 h-full">
              <div className="flex line-clamp-2">
                <h5 className="font-semibold text-base tracking-tight">
                  {arr.name}
                </h5>
              </div>
              <div className="flex text-[10px] space-x-1">
                <FaRegCalendarCheck className="w-4 h-4" />
                <span>تاریخ شروع:</span>
                <span>{formattedDate(arr.startDate)}</span>
              </div>
              <div className="flex text-[10px] space-x-1">
                <PiStudent className="w-4 h-4" />
                <span>ظرفیت باقی مانده:</span>
                <span>{arr.availableSeats} نفر</span>
              </div>
              <p className="text-gray-700 dark:text-gray-400 text-xs line-clamp-2 flex-grow">
                {arr.description}
              </p>

              <Button
                color="dark"
                outline
                disabled={!arr.isActive}
                className={`mt-auto transition-all duration-300 ${
                  !arr.isActive && "cursor-not-allowed opacity-70"
                }`}
              >
                اطلاعات بیشتر
                <FaArrowLeft className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        </Link>
      ))}
    </ThemeProvider>
  );
}

export default CourseCards;

function formattedDate(isoString) {
  return new Date(isoString).toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}
