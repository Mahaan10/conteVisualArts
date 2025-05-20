import { PiGraduationCapLight } from "react-icons/pi";
import CoursesSidebar from "../ui/CoursesSidebar";
import { Button, createTheme, ThemeProvider } from "flowbite-react";
import { TbFilters } from "react-icons/tb";
import { FaSort } from "react-icons/fa6";
import CourseCards from "../ui/CourseCards";
import useCourses from "../hooks/useCourses";
import { useToast } from "../context/useToastContext";
import Loading from "../ui/Loading";

const customTheme = createTheme({
  button: {
    base: "gap-x-3 w-40",
    outlineColor: {
      dark: "dark:hover:text-whitesmoke cursor-pointer transition-colors duration-300 text-xs",
    },
  },
});

function Courses() {
  const { courses, error, isError, isLoading } = useCourses();
  const { showToast } = useToast();
  console.log(courses);

  if (isLoading) return <Loading />;
  if (isError)
    return showToast(
      "error",
      error?.response?.data?.message || "بارگذاری با خطا مواجه شد"
    );

  return (
    <div className="container">
      <div className="my-10 flex items-center justify-between mx-4">
        <div className="flex items-center gap-x-2">
          <PiGraduationCapLight className="w-7 h-7" />
          <p className="text-xl">دوره ها</p>
        </div>
      </div>
      {/* ... */}
      <div className="flex items-center justify-center gap-x-4 md:hidden mb-8">
        <ThemeProvider theme={customTheme}>
          <Button color="dark" pill outline>
            <TbFilters className="w-5 h-5" />
            <span> فیلتر دوره ها</span>
          </Button>
          <Button color="dark" pill outline>
            <FaSort className="w-5 h-5" />
            <span>مرتب سازی</span>
          </Button>
        </ThemeProvider>
      </div>
      <div className="grid grid-cols-12 gap-5 mx-4">
        {/* Sidebar */}
        <aside className="hidden lg:block col-span-12 lg:col-span-4 xl:col-span-3 order-2 lg:order-2 lg:pl-8">
          <CoursesSidebar />
        </aside>
        <div className="col-span-12 lg:col-span-8 xl:col-span-9 order-1 lg:order-2 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-y-8 sm:gap-x-8">
            <CourseCards array={courses} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Courses;
