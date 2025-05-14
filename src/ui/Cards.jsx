import { Button, Card, createTheme, ThemeProvider } from "flowbite-react";
import { FaArrowLeft } from "react-icons/fa6";

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

function Cards({ array }) {
  return (
    <ThemeProvider theme={customTheme}>
      {array.map((array) => (
        <Card key={array.id} className="max-w-sm">
          <div className="w-full">
            <img
              //src="https://flowbite.com/docs/images/blog/image-1.jpg"
              src={array.image}
              alt=""
              className="w-full h-44 rounded-t-lg"
            />
          </div>
          <div className="flex flex-col grow gap-y-3">
            <div className="flex line-clamp-2">
              <h5 className="font-semibold text-base tracking-tight">
                {array.title}
              </h5>
            </div>
            <p className="text-left text-[8px]">{array.date}</p>
            <p className="text-gray-700 dark:text-gray-400 text-xs text-ellipsis overflow-hidden line-clamp-3">
              {array.description}
            </p>
          </div>
          <Button color="dark" outline>
            اطلاعات بیشتر
            <FaArrowLeft className="w-4 h-4" />
          </Button>
        </Card>
      ))}
    </ThemeProvider>
  );
}

export default Cards;
