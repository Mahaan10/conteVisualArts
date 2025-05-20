import {
  Button,
  Card,
  createTheme,
  Rating,
  RatingStar,
  ThemeProvider,
} from "flowbite-react";

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
          className="max-w-sm text-xs relative"
          imgAlt={arr.title}
          imgSrc={arr.image}
        >
          {/* Rating Section */}
          <span className="absolute top-2 right-2 bg-transparent px-2 py-1 z-10">
            <Rating>
              <RatingStar />
              <RatingStar />
              <RatingStar />
              <RatingStar filled={false} />
            </Rating>
          </span>
          <h5 className="text-xl font-semibold tracking-tight line-clamp-2">
            {arr.title}
          </h5>
          <h1 className="line-clamp-2">{arr?.description}</h1>

          <div className="flex items-center justify-between">
            <p>{arr?.student?.name}</p>
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

/* function formattedDate(isoString) {
  return new Date(isoString).toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
} */
