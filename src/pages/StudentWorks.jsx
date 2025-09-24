import { GiAbstract024 } from "react-icons/gi";
import { Button, createTheme, ThemeProvider } from "flowbite-react";
import { TbFilters } from "react-icons/tb";
import { FaSort } from "react-icons/fa6";
import StudentWorksSidebar from "../ui/StudentWorksSidebar";
import useStudentWorks from "../hooks/useStudentWorks";
import StudentWorksCards from "../ui/StudentWorksCards";
import Loading from "../ui/Loading";
import toast from "react-hot-toast";
import NotFound from "../ui/NotFound";
import { useFilter } from "../context/FilterContext";
import { useState } from "react";
import ModalFilterSort from "../ui/ModalFilterSort";

const customTheme = createTheme({
  button: {
    base: "gap-x-3 w-40",
    outlineColor: {
      dark: "dark:hover:text-whitesmoke bg-transparent border-gray-400 hover:bg-almond-cookie hover:border-almond-cookie hover:text-inherit dark:border-gray-600 dark:hover:border-gray-700 cursor-pointer transition-colors duration-300 text-xs",
    },
  },
});

function StudentWorks() {
  const { studentWorks, error, isError, isLoading } = useStudentWorks();
  const { filters } = useFilter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const type = "studentWorks";

  const allCourses = studentWorks.map((work) => work?.course);

  const courses = Array.from(
    new Map(allCourses.map((course) => [course?._id, course])).values()
  );

  const categoryLabels = courses.reduce((acc, course) => {
    acc[course.name] = course?.name;
    return acc;
  }, {});

  const filteredStudentWorks = studentWorks
    ?.filter((work) => {
      const category = filters[type]?.category;
      if (!category) return true;
      return work.course?.name === category;
    })
    .sort((a, b) => {
      const sort = filters[type]?.sort;
      if (sort === "newest") {
        return new Date(b.date) - new Date(a.date);
      } else if (sort === "oldest") {
        return new Date(a.date) - new Date(b.date);
      }
      return 0;
    });

  if (isLoading) return <Loading />;
  if (isError) {
    toast.error(error?.response?.data?.message || "بارگذاری با خطا مواجه شد");
    return <NotFound />;
  }

  return (
    <div className="container">
      <div className="my-10 flex items-center justify-between mx-4">
        <div
          className="flex items-center gap-x-2"
          data-aos="fade-right"
          data-aos-duration="1000"
        >
          <GiAbstract024 className="w-7 h-7" />
          <p className="text-xl">آثار هنرجویان</p>
        </div>
      </div>
      <div
        className="flex items-center justify-center gap-x-4 md:hidden mb-8"
        data-aos="zoom-in"
        data-aos-duration="1000"
      >
        <ThemeProvider theme={customTheme}>
          <Button color="dark" outline onClick={() => setIsDrawerOpen(true)}>
            <TbFilters className="w-5 h-5" />
            <span>فیلتر آثار</span>
          </Button>
        </ThemeProvider>
      </div>
      <div className="grid grid-cols-12 gap-5 mx-4">
        {/* Sidebar */}
        <aside className="hidden lg:block col-span-12 lg:col-span-4 xl:col-span-3 order-2 lg:order-2 lg:pl-8">
          <StudentWorksSidebar courses={courses} />
        </aside>
        <div className="col-span-12 lg:col-span-8 xl:col-span-9 order-1 lg:order-2 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-8 sm:gap-x-8 bg-gray-100 dark:bg-gray-950 rounded-lg p-4">
            <StudentWorksCards array={filteredStudentWorks} />
          </div>
        </div>
      </div>
      <ModalFilterSort
        isOpen={isDrawerOpen}
        setIsOpen={setIsDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        type={type}
        categoryLabels={categoryLabels}
      />
    </div>
  );
}

export default StudentWorks;
