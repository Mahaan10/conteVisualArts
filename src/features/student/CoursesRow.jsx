import { Link } from "react-router-dom";
import Table from "../../ui/Table";
import { Rating, RatingStar } from "flowbite-react";

function CoursesRow({ course, index }) {
  return (
    <Table.Row>
      <td className="py-2">{index + 1}</td>
      <td>
        <Link
          to={`/courses/${course?.course?._id}`}
          className="p-2 rounded-lg bg-almond-cookie dark:hover:bg-dark-cerulean hover:bg-golden-sand dark:bg-purple-plumeria transition-colors duration-300 cursor-pointer btn w-auto justify-center mx-auto"
        >
          {course?.course?.name}
        </Link>
      </td>
      <td>{course?.course?.duration} جلسه</td>
      <td>
        <span
          className={`p-1 rounded-sm text-whitesmoke ${
            course?.course?.ageGroup === "child"
              ? "bg-cyan-700"
              : course?.course?.ageGroup === "adult"
              ? "bg-sky-900"
              : "bg-cyan-950"
          }`}
        >
          {course?.course?.ageGroup === "child"
            ? "کودکان"
            : course?.course?.ageGroup === "adult"
            ? "بزرگسالان"
            : "همه سنین"}
        </span>
      </td>
      <td>
        <div className="flex items-center justify-center">
          <Rating>
            {[1, 2, 3, 4, 5].map((star) => (
              <RatingStar
                key={star}
                filled={star <= course?.course?.ratingsAverage}
              />
            ))}
          </Rating>
        </div>
      </td>
    </Table.Row>
  );
}

export default CoursesRow;
