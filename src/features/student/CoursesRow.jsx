import Table from "../../ui/Table";
import formattedDate from "../../utils/formattedDate";

function CoursesRow({ course, index }) {
  return (
    <Table.Row>
      <td className="py-2">{index + 1}</td>
      <td>{course?.course?.name}</td>
      <td>{formattedDate(course?.course?.startDate)}</td>
      <td>{formattedDate(course?.enrolledAt)}</td>
      <td>{course?.course?.duration} جلسه</td>
      <td>{course?.course?.maxcapacity} نفر</td>
      <td>{course?.course?.availableSeats} نفر</td>
      <td>{course?.course?.isActive ? "در حال پذیرش ⏳" : "تکمیل ظرفیت ✔️"}</td>
    </Table.Row>
  );
}

export default CoursesRow;
