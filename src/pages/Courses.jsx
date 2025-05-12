import { PiGraduationCapLight } from "react-icons/pi";
import CoursesSidebar from "../ui/CoursesSidebar";

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
      <div className="grid grid-cols-6 gap-y-5 mx-4">
        {/* Sidebar */}
        <aside className="col-span-full lg:col-span-4 xl:col-span-3 lg:sticky top-6 space-y-6">
          <CoursesSidebar />
        </aside>
      </div>
    </div>
  );
}

export default Courses;
