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

function StudentWorksCards({ array }) {
  return (
    <ThemeProvider theme={customTheme}>
      {array.map((arr) => (
        <Card
          key={arr._id}
          className="max-w-sm text-xs"
          imgAlt={arr.title}
          imgSrc={arr.image}
        >
          <h5 className="text-xl font-semibold tracking-tight line-clamp-2">
            {arr.title}
          </h5>
          <h1 className="line-clamp-2">{arr?.description}</h1>

          <div className="flex items-center justify-between">
            <p>{arr?.student?.name}</p>
            <Rating>
              <RatingStar />
            </Rating>
          </div>
          <div className="flex items-center justify-center">
            <Button
              color="dark"
              outline
              className="transition-all duration-300"
            >
              پیش نمایش
            </Button>
          </div>
        </Card>
      ))}
    </ThemeProvider>
  );
}

export default StudentWorksCards;

function formattedDate(isoString) {
  return new Date(isoString).toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}
