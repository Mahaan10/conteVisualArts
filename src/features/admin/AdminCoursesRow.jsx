import { useState } from "react";
import Table from "../../ui/Table";
import { CiEdit } from "react-icons/ci";
import { PiTrash } from "react-icons/pi";
import { createTheme, ThemeProvider, ToggleSwitch } from "flowbite-react";

const customTheme = createTheme({
  toggleSwitch: {
    toggle: {
      checked: {
        off: "bg-gray-400 dark:bg-gray-300",
      },
    },
  },
});

function AdminCoursesRow({ course, index, onEdit, onDelete }) {
  const [courseActiveToggle, setCourseActiveToggle] = useState(true);

  return (
    <Table.Row>
      <td>{index + 1}</td>
      <td>{course.name}</td>
      <td>{formattedDate(course.startDate)}</td>
      <td>
        <ThemeProvider theme={customTheme}>
          <ToggleSwitch
            checked={courseActiveToggle}
            onChange={() => setCourseActiveToggle(!courseActiveToggle)}
            sizing="md"
            color="green"
          />
        </ThemeProvider>
      </td>
      <td>{course.duration} جلسه</td>
      <td>{course.availableSeats} نفر</td>
      <td>{course.enrolledStudents.length} هنرجو</td>
      <td>{course.price} تومان</td>
      <td className="flex gap-x-4">
        <button
          className="btn text-whitesmoke w-24 bg-cyan-700 hover:bg-cyan-800"
          onClick={onEdit}
        >
          <span>ویرایش</span>
          <CiEdit className="w-5 h-5" />
        </button>
        <button
          className="btn text-whitesmoke w-24 bg-red-600 hover:bg-red-700"
          onClick={onDelete}
        >
          <span>حذف</span>
          <PiTrash className="w-5 h-5" />
        </button>
      </td>
    </Table.Row>
  );
}

export default AdminCoursesRow;

function formattedDate(isoString) {
  return new Date(isoString).toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}
