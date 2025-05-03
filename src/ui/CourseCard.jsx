import { Link } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { IoPeopleOutline } from "react-icons/io5";

function CourseCard({ course }) {
  return (
    <div className="bg-gradient-to-b from-20% to-100%% dark:to-light-purple from-neutral-200 to-mindaro text-black rounded-lg flex flex-col">
      {/* Course Image */}
      <div className="w-full">
        <img src={course.image} alt="" className="w-full h-44 rounded-t-lg" />
      </div>
      {/* Course Title and Description */}
      <div className="flex-grow px-4.5 py-4">
        <h1 className="line-clamp-2 text-base min-[315px]:text-2xl font-bold mb-3">
          {course.title}
        </h1>
        <p className="opacity-65 font-bold line-clamp-2">
          {course.description}
        </p>
      </div>
      {/* Course Master and num of attendence */}
      <div className="flex items-center justify-between px-4.5 py-1.5 gap-x-2 border-t dark:border-dark-violet/25 border-sand/50">
        <Link
          to=""
          className="my-1 flex items-center justify-center gap-1 hover:text-sand cursor-pointer"
        >
          <FaRegUser className="w-4 h-4" />
          <span className="text-base text-nowrap opacity-80 font-bold">
            {course.master}
          </span>
        </Link>
        <div className="flex items-center justify-center gap-x-1">
          <IoPeopleOutline className="w-5 h-5" />
          <span className="text-lg">{course.num}</span>
        </div>
      </div>
      {/* Course submit */}
      <div className="w-full text-center">
        <button className="btn text-lg font-bold !rounded-t-none !py-3">
          ثبت نام
        </button>
      </div>
    </div>
  );
}

export default CourseCard;
