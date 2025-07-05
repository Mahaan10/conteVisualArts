import {
  Accordion,
  AccordionContent,
  AccordionPanel,
  AccordionTitle,
  createTheme,
  ThemeProvider,
} from "flowbite-react";
import { TbBorderCorners } from "react-icons/tb";
import { useFilter } from "../context/FilterContext";

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

function NewsSidebar() {
  const { filters, updateSort } = useFilter();
  const type = "news";
  return (
    <>
      {/* Sidebar */}
      <div
        className="space-y-2 bg-gray-100 dark:bg-gray-950 rounded-lg p-4"
        data-aos="fade-down"
        data-aos-duration="1200"
      >
        <ThemeProvider theme={customTheme}>
          {/* .... */}
          <Accordion collapseAll>
            <AccordionPanel>
              <AccordionTitle>
                <TbBorderCorners className="w-5 h-5" />
                <span>مرتب سازی</span>
              </AccordionTitle>
              <AccordionContent>
                <input
                  type="radio"
                  checked={filters[type]?.sort === "newest"}
                  onChange={() => updateSort("newest", type)}
                />
                <label htmlFor="">جدیدترین</label>
              </AccordionContent>
              <AccordionContent>
                <input
                  type="radio"
                  checked={filters[type]?.sort === "oldest"}
                  onChange={() => updateSort("oldest", type)}
                />
                <label htmlFor="">قدیمی‌ترین</label>
              </AccordionContent>
            </AccordionPanel>
          </Accordion>
        </ThemeProvider>
      </div>
    </>
  );
}

export default NewsSidebar;
