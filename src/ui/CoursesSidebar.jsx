import {
  Accordion,
  AccordionContent,
  AccordionPanel,
  AccordionTitle,
  createTheme,
  FloatingLabel,
  ThemeProvider,
} from "flowbite-react";
import { PiMagnifyingGlassBold } from "react-icons/pi";

const customTheme = createTheme({
  floatingLabel: {
    label: {
      default: {
        outlined: {
          sm: "right-1 left-auto dark:bg-slate-950 bg-whitesmoke cursor-text",
        },
      },
    },
  },
  accordion: {
    root: {
      base: "border-gray-300",
    },
    title: {
      base: "text-sm p-2 cursor-pointer",
      flush: {
        off: "hover:bg-gray-100 focus:ring-0 focus:ring-gray-200 dark:hover:bg-gray-800 dark:focus:ring-gray-800",
        on: "bg-transparent dark:bg-transparent",
      },
    },
    content: {
      base: "p-2 first:rounded-t-lg last:rounded-b-lg dark:bg-red-700 bg-red-700",
    },
  },
});

function CoursesSidebar() {
  return (
    <>
      <div className="flex gap-x-4 md:hidden"></div>
      <div className="grid grid-cols-6 gap-4">
        <div className="hidden md:block col-span-6 lg:col-span-4 xl:col-span-3 order-2">
          {/* Sidebar */}
          <div className="space-y-2">
            <ThemeProvider theme={customTheme}>
              <form action="" className="relative">
                <FloatingLabel
                  variant="outlined"
                  label="جستجو بین دوره ها"
                  sizing="sm"
                  type="text"
                />

                <button className="absolute top-2.5 p-1.5 left-2 cursor-pointer hover:bg-golden-sand dark:hover:bg-purple-plumeria bg-almond-cookie dark:bg-dark-cerulean rounded-full transition-colors duration-300">
                  <PiMagnifyingGlassBold className="w-4 h-4" />
                </button>
              </form>
              {/* ... */}
              <Accordion>
                <AccordionPanel>
                  <AccordionTitle>نوع دوره</AccordionTitle>
                  <AccordionContent>...</AccordionContent>
                </AccordionPanel>
              </Accordion>
            </ThemeProvider>
          </div>
        </div>
      </div>
    </>
  );
}

export default CoursesSidebar;
