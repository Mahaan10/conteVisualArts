import { Link } from "react-router-dom";
import Table from "../../ui/Table";
import formattedDate from "../../utils/formattedDate";

function CoursesRow({ course, index }) {
  return (
    <Table.Row>
      <td className="py-2">{index + 1}</td>
      <td>
        <Link
          to={`/courses/${course?._id}`}
          className="p-2 rounded-lg bg-almond-cookie dark:hover:bg-dark-cerulean hover:bg-golden-sand dark:bg-purple-plumeria transition-colors duration-300 cursor-pointer btn justify-center mx-auto"
        >
          {course?.name}
        </Link>
      </td>
      <td>{formattedDate(course?.startDate)}</td>
      <td>{course?.duration} جلسه</td>
      <td>{course?.maxcapacity} نفر</td>
      <td>{course?.availableSeats} نفر</td>
      <td>{course?.isActive ? "در حال پذیرش ⏳" : "تکمیل ظرفیت ✔️"}</td>
    </Table.Row>
  );
}

export default CoursesRow;
