import Table from "../../ui/Table";
import formattedDate from "../../utils/formattedDate";

function CoursesRow({ course, index }) {
  return (
    <Table.Row>
      <td className="py-2">{index + 1}</td>
      <td>{course.name}</td>
      <td>{formattedDate(course.startDate)}</td>
      <td>{course.duration} جلسه</td>
      <td>{course.availableSeats} نفر</td>
      <td>{course.isActive ? "در حال پذیرش ⏳" : "تکمیل ظرفیت ✔️"}</td>
    </Table.Row>
  );
}

export default CoursesRow;
