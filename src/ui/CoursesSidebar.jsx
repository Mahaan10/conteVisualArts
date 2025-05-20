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
import { TbCategory, TbBorderCorners } from "react-icons/tb";

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
      base: "border-gray-300 last:mb-4 divide-y-0",
    },
    title: {
      base: "text-sm p-2 cursor-pointer",
      flush: {
        off: "hover:bg-gray-200 focus:ring-0 dark:hover:bg-slate-900 transition-colors duration-300",
        on: "bg-transparent dark:bg-transparent",
      },
      heading: "flex items-center gap-x-1",
    },
    content: {
      base: "p-2 first:rounded-t-lg last:rounded-b-lg dark:bg-slate-900 bg-gray-100 text-xs cursor-pointer hover:bg-gray-200 dark:hover:bg-slate-950 flex items-center gap-x-2 transition-colors duration-300",
    },
  },
});

function CoursesSidebar() {
  return (
    <>
      {/* Sidebar */}
      <div className="space-y-2 bg-gray-100 dark:bg-gray-950 rounded-lg p-4">
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
          <Accordion collapseAll>
            <AccordionPanel>
              <AccordionTitle>
                <TbCategory className="w-5 h-5" />
                <span>دسته بندی دوره ها</span>
              </AccordionTitle>
              <AccordionContent>
                <input type="checkbox" />
                <label htmlFor="">نقاشی</label>
              </AccordionContent>
              <AccordionContent>
                <input type="checkbox" />
                <label htmlFor="">کوزه گری</label>
              </AccordionContent>
            </AccordionPanel>
          </Accordion>
          {/* .... */}
          <Accordion collapseAll>
            <AccordionPanel>
              <AccordionTitle>
                <TbBorderCorners className="w-5 h-5" />
                <span>مرتب سازی</span>
              </AccordionTitle>
              <AccordionContent>
                <input type="radio" />
                <label htmlFor="">جدیدترین</label>
              </AccordionContent>
              <AccordionContent>
                <input type="radio" />
                <label htmlFor="">قدیمی ترین</label>
              </AccordionContent>
            </AccordionPanel>
          </Accordion>
        </ThemeProvider>
      </div>
    </>
  );
}

export default CoursesSidebar;
