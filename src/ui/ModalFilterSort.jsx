import {
  Drawer,
  DrawerHeader,
  DrawerItems,
  Accordion,
  AccordionPanel,
  AccordionTitle,
  createTheme,
  ThemeProvider,
} from "flowbite-react";
import { useFilter } from "../context/FilterContext";
import { TbBorderCorners, TbCategory } from "react-icons/tb";
import { FaSort } from "react-icons/fa6";
import { useEffect, useState } from "react";

const categoryLabels = {
  child: "کودکان",
  adult: "بزرگسالان",
  summer: "تابستانی",
  autumn: "پاییزی",
  special: "ویژه",
};

const customTheme = createTheme({
  drawer: {
    root: {
      base: "transition-all duration-700",
    },
    header: {
      inner: {
        closeButton:
          "absolute end-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-700 dark:text-gray-400 hover:bg-gray-300 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-whitesmoke cursor-pointer",
      },
    },
  },
  accordion: {
    root: {
      base: "border-gray-300 p-3 divide-y-0",
    },
    title: {
      base: "text-sm p-2 cursor-pointer",
      flush: {
        off: "hover:bg-gray-200 focus:ring-0 dark:hover:bg-slate-900 transition-colors duration-700",
        on: "bg-transparent dark:bg-transparent",
      },
      heading: "flex items-center gap-x-1",
    },
  },
});

function ModalFilterSort({ isOpen, setIsOpen, onClose, type = "courses" }) {
  const { filters, toggleCategory, updateSort } = useFilter();
  const [openSection, setOpenSection] = useState(null);

  const toggleAccordion = (section) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setIsOpen]);

  return (
    <ThemeProvider theme={customTheme}>
      <Drawer
        open={isOpen}
        onClose={onClose}
        position="bottom"
        className="z-50"
      >
        <DrawerHeader
          titleIcon={FaSort}
          title="فیلتر و مرتب‌سازی"
          className="px-4"
        />
        <DrawerItems className="px-4 py-2 space-y-6 text-sm">
          {/* دسته‌بندی */}
          <Accordion collapseAll>
            <AccordionPanel>
              <AccordionTitle onClick={() => toggleAccordion("category")}>
                <TbCategory className="w-5 h-5" />
                <span>دسته‌بندی دوره‌ها</span>
              </AccordionTitle>
              <div
                className={`transition-all duration-600 overflow-hidden  ${
                  openSection === "category"
                    ? "max-h-96 opacity-100 mt-2 p-5 first:rounded-t-lg last:rounded-b-lg dark:bg-gray-900 bg-gray-200"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(categoryLabels).map(([key, label]) => (
                    <label
                      key={key}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        name="category"
                        checked={filters[type]?.category === key}
                        onChange={() => toggleCategory(key, type)}
                      />
                      {label}
                    </label>
                  ))}
                </div>
              </div>
            </AccordionPanel>
          </Accordion>

          {/* مرتب‌سازی */}
          <Accordion collapseAll>
            <AccordionPanel>
              <AccordionTitle onClick={() => toggleAccordion("sort")}>
                <TbBorderCorners className="w-5 h-5" />
                <span>مرتب‌سازی</span>
              </AccordionTitle>
              <div
                className={`transition-all duration-600 overflow-hidden ${
                  openSection === "sort"
                    ? "max-h-40 opacity-100 mt-2 p-5 first:rounded-t-lg last:rounded-b-lg dark:bg-gray-900 bg-gray-200"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="sort"
                      checked={filters[type]?.sort === "newest"}
                      onChange={() => updateSort("newest", type)}
                    />
                    جدیدترین
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="sort"
                      checked={filters[type]?.sort === "oldest"}
                      onChange={() => updateSort("oldest", type)}
                    />
                    قدیمی‌ترین
                  </label>
                </div>
              </div>
            </AccordionPanel>
          </Accordion>

          {/* دکمه اعمال */}
          <button
            onClick={onClose}
            className="w-full bg-almond-cookie hover:bg-golden-sand dark:bg-dark-purple dark:hover:bg-purple-plumeria py-2 rounded-lg mt-4 cursor-pointer"
          >
            اعمال فیلتر
          </button>
        </DrawerItems>
      </Drawer>
    </ThemeProvider>
  );
}

export default ModalFilterSort;
