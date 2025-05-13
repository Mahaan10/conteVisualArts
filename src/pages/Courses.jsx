import { PiGraduationCapLight } from "react-icons/pi";
import CoursesSidebar from "../ui/CoursesSidebar";
import HomePageCourses from "../ui/HomePageCourses";

function Courses() {
  return (
    <div className="container">
      <div className="my-10 flex items-center justify-between mx-4">
        <div className="flex items-center gap-x-2">
          <PiGraduationCapLight className="w-7 h-7" />
          <p className="text-xl">دوره ها</p>
        </div>
        <p className="opacity-50">25 دوره آموزشی</p>
      </div>
      {/* ... */}
      <div className="flex gap-x-4 md:hidden"></div>
      <div className="grid grid-cols-12 gap-5 mx-4">
        {/* Sidebar */}
        <aside className="hidden lg:block col-span-12 lg:col-span-4 xl:col-span-3 order-2 lg:order-2 lg:pl-8">
          <CoursesSidebar />
        </aside>
        <div className="col-span-12 lg:col-span-8 xl:col-span-9 order-1 lg:order-2">
          <div className="grid grid-cols-12 gap-y-8 sm:gap-x-8 lg:gap-6 mb-10 lg:mb-0">
            <div className="mb-14 col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-2">
              <HomePageCourses />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Courses;
