import { Button, Card, createTheme, ThemeProvider } from "flowbite-react";
import { FaArrowLeft, FaRegCalendarCheck } from "react-icons/fa6";
import { PiStudent } from "react-icons/pi";

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
  // Sort Array based on isActive or not
  const sortedArray = [...array].sort((a, b) => {
    return b.isActive - a.isActive;
  });

  return (
    <ThemeProvider theme={customTheme}>
      {sortedArray.map((arr) => (
        <Card
          key={arr._id}
          className={`max-w-sm transition-all duration-300 ${
            !arr.isActive && "cursor-not-allowed grayscale-75 opacity-50"
          }`}
        >
          {/* Badge for inactive courses */}
          {!arr.isActive && (
            <span className="absolute top-2 left-2 bg-red-500 text-whitesmoke text-xs px-2 py-1 rounded z-10">
              تکمیل ظرفیت
            </span>
          )}
          <div className="w-full">
            <img
              //src="https://flowbite.com/docs/images/blog/image-1.jpg"
              src={arr.Image}
              alt={arr.name}
              className="w-full h-44 rounded-t-lg"
            />
          </div>
          <div className="flex flex-col grow gap-y-3">
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
            <p className="text-gray-700 dark:text-gray-400 text-xs text-ellipsis overflow-hidden line-clamp-2">
              {arr.description}
            </p>
          </div>
          <Button
            color="dark"
            outline
            disabled={!arr.isActive}
            className={`transition-all duration-300 ${
              !arr.isActive && "cursor-not-allowed opacity-70"
            }`}
          >
            اطلاعات بیشتر
            <FaArrowLeft className="w-4 h-4" />
          </Button>
        </Card>
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
