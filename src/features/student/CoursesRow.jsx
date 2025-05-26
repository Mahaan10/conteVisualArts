import Table from "../../ui/Table";

function CoursesRow({ course, index }) {
  return (
    <Table.Row>
      <td className="py-2">{index + 1}</td>
      <td>{course.name}</td>
      <td>{formattedDate(course.startDate)}</td>
      <td>{course.duration}</td>
      <td>{course.availableSeats}</td>
      <td>{course.isActive ? "در حال پذیرش ⏳" : "تکمیل ظرفیت ✔️"}</td>
    </Table.Row>
  );
}

export default CoursesRow;

function formattedDate(isoString) {
  return new Date(isoString).toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}
