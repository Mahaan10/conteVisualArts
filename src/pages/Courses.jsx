import { PiGraduationCapLight } from "react-icons/pi";
import CoursesSidebar from "../ui/CoursesSidebar";
import { Button, createTheme, ThemeProvider } from "flowbite-react";
import { TbFilters } from "react-icons/tb";
import CourseCards from "../ui/CourseCards";
import useCourses from "../hooks/useCourses";
import { useToast } from "../context/useToastContext";
import Loading from "../ui/Loading";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFilter } from "../context/FilterContext";
import ModalFilterSort from "../ui/ModalFilterSort";

const customTheme = createTheme({
  button: {
    base: "gap-x-3 w-40",
    outlineColor: {
      dark: "dark:hover:text-whitesmoke cursor-pointer transition-colors duration-300 text-xs",
    },
  },
});

function Courses() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { courses, error, isError, isLoading } = useCourses();
  const { showToast } = useToast();
  const location = useLocation();
  const { filters } = useFilter();
  const type = "courses";

  const isCourseDetailPage = location.pathname.startsWith("/courses/");

  const filteredCourses = courses
    ?.filter((course) => {
      const searchValue = filters[type]?.search?.trim() || "";
      return !searchValue || course.name?.includes(searchValue);
    })
    .filter((course) => {
      const category = filters[type]?.category;
      if (!category) return true;
      return category === "child" || category === "adult"
        ? course.ageGroup === category
        : course.badge === category;
    })
    .sort((a, b) => {
      const sort = filters[type]?.sort;
      if (sort === "newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sort === "oldest") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
      return 0;
    });

  useEffect(() => {
    if (isError) {
      showToast(
        "error",
        error?.response?.data?.message || "بارگذاری با خطا مواجه شد"
      );
    }
  }, [isError, error, showToast]);

  if (isLoading) return <Loading />;

  return (
    <div className="container">
      {/* ... */}
      {isCourseDetailPage ? (
        <Outlet />
      ) : (
        <>
          <div className="my-10 flex items-center justify-between mx-4">
            <div
              className="flex items-center gap-x-2"
              data-aos="fade-right"
              data-aos-duration="1000"
            >
              <PiGraduationCapLight className="w-7 h-7" />
              <p className="text-xl">دوره ها</p>
            </div>
          </div>
          <div
            className="flex items-center justify-center gap-x-4 md:hidden mb-8"
            data-aos="zoom-in"
            data-aos-duration="1000"
          >
            <ThemeProvider theme={customTheme}>
              <Button
                color="dark"
                pill
                outline
                onClick={() => setIsDrawerOpen(true)}
              >
                <TbFilters className="w-5 h-5" />
                <span>فیلتر دوره ها</span>
              </Button>
            </ThemeProvider>
          </div>
          <div className="grid grid-cols-12 gap-5 mx-4">
            {/* Sidebar */}
            <aside className="hidden lg:block col-span-12 lg:col-span-4 xl:col-span-3 order-2 lg:order-2 lg:pl-8 ">
              <CoursesSidebar />
            </aside>
            <div className="col-span-12 lg:col-span-8 xl:col-span-9 order-1 lg:order-2 mb-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-y-8 sm:gap-x-8 bg-gray-100 dark:bg-gray-950 rounded-lg p-4">
                <CourseCards array={filteredCourses} />
              </div>
            </div>
          </div>
        </>
      )}
      <ModalFilterSort
        isOpen={isDrawerOpen}
        setIsOpen={setIsDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        type="courses"
      />
    </div>
  );
}

export default Courses;
