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
      base: "p-2 first:rounded-t-lg last:rounded-b-lg dark:bg-gray-900 bg-gray-200 text-xs cursor-pointer hover:bg-gray-200 dark:hover:bg-slate-950 flex items-center gap-x-2 transition-colors duration-300",
    },
  },
});

function CoursesSidebar() {
  const { filters, updateSearch, toggleCategory, updateSort } = useFilter();
  const type = "courses";

  return (
    <>
      {/* Sidebar */}
      <div
        className="space-y-2 bg-gray-100 dark:bg-gray-950 rounded-lg p-4"
        data-aos="fade-down"
        data-aos-duration="1200"
      >
        <ThemeProvider theme={customTheme}>
          <form action="" className="relative">
            <FloatingLabel
              variant="outlined"
              label="جستجو بین دوره ها"
              sizing="sm"
              type="text"
              value={filters[type].search}
              onChange={(e) => updateSearch(e.target.value, type)}
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
                <input
                  type="checkbox"
                  checked={filters[type].category === "child"}
                  onChange={() => toggleCategory("child", type)}
                />
                <label>کودکان</label>
              </AccordionContent>
              <AccordionContent>
                <input
                  type="checkbox"
                  checked={filters[type].category === "adult"}
                  onChange={() => toggleCategory("adult", type)}
                />
                <label>بزرگسالان</label>
              </AccordionContent>
              <AccordionContent>
                <input
                  type="checkbox"
                  checked={filters[type].category === "summer"}
                  onChange={() => toggleCategory("summer", type)}
                />
                <label>تابستانی</label>
              </AccordionContent>
              <AccordionContent>
                <input
                  type="checkbox"
                  checked={filters[type].category === "autumn"}
                  onChange={() => toggleCategory("autumn", type)}
                />
                <label>پائیزی</label>
              </AccordionContent>
              <AccordionContent>
                <input
                  type="checkbox"
                  checked={filters[type].category === "special"}
                  onChange={() => toggleCategory("special", type)}
                />
                <label>ویژه</label>
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
                <input
                  type="radio"
                  checked={filters[type].sort === "newest"}
                  onChange={() => updateSort("newest")}
                />
                <label htmlFor="">جدیدترین</label>
              </AccordionContent>
              <AccordionContent>
                <input
                  type="radio"
                  checked={filters[type].sort === "oldest"}
                  onChange={() => updateSort("oldest")}
                />
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
