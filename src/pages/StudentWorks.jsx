import { GiAbstract024 } from "react-icons/gi";
import { Button, createTheme, ThemeProvider } from "flowbite-react";
import { TbFilters } from "react-icons/tb";
import { FaSort } from "react-icons/fa6";
import StudentWorksSidebar from "../ui/StudentWorksSidebar";
import useStudentWorks from "../hooks/useStudentWorks";
import StudentWorksCards from "../ui/StudentWorksCards";
import Loading from "../ui/Loading";
import { useToast } from "../context/useToastContext";

const customTheme = createTheme({
  button: {
    base: "gap-x-3 w-40",
    outlineColor: {
      dark: "dark:hover:text-whitesmoke cursor-pointer transition-colors duration-300 text-xs",
    },
  },
});

function StudentWorks() {
  const { studentWorks, error, isError, isLoading } = useStudentWorks();
  const { showToast } = useToast();
  console.log(studentWorks);

  if (isLoading) return <Loading />;
  if (isError)
    return showToast(
      "error",
      error?.response?.data.message || "بارگذاری با خطا مواجه شد"
    );

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
          <Button color="dark" pill outline>
            <TbFilters className="w-5 h-5" />
            <span> فیلتر آثار</span>
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
          <StudentWorksSidebar />
        </aside>
        <div className="col-span-12 lg:col-span-8 xl:col-span-9 order-1 lg:order-2 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-y-8 sm:gap-x-8 bg-gray-100 dark:bg-gray-950 rounded-lg p-4">
            <StudentWorksCards array={studentWorks} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentWorks;
