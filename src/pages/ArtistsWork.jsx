import { GiAbstract024 } from "react-icons/gi";
import { Button, createTheme, ThemeProvider } from "flowbite-react";
import HomePageCourses from "../ui/HomePageCourses";
import ArtistsWorkSidebar from "../ui/ArtistsWorkSidebar";
import { TbFilters } from "react-icons/tb";
import { FaSort } from "react-icons/fa6";

const customTheme = createTheme({
  button: {
    base: "gap-x-3 w-40",
    outlineColor: {
      dark: "dark:hover:text-whitesmoke cursor-pointer transition-colors duration-300 text-xs",
    },
  },
});

function ArtistsWork() {
  return (
    <div className="container">
      <div className="my-10 flex items-center justify-between mx-4">
        <div className="flex items-center gap-x-2">
          <GiAbstract024 className="w-7 h-7" />
          <p className="text-xl">آثار هنرجویان</p>
        </div>
      </div>
      <div className="flex items-center justify-center gap-x-4 md:hidden mb-8">
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
          <ArtistsWorkSidebar />
        </aside>
        <div className="col-span-12 lg:col-span-8 xl:col-span-9 order-1 lg:order-2 mb-10">
          <div className="grid grid-cols-1 min-[400px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-8 sm:gap-x-8 lg:gap-6 lg:mb-0">
            <HomePageCourses />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArtistsWork;
