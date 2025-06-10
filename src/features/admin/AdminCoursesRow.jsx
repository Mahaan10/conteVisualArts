import Table from "../../ui/Table";
import { CiEdit } from "react-icons/ci";
import { PiTrash } from "react-icons/pi";
import { createTheme, ThemeProvider, ToggleSwitch } from "flowbite-react";
import { useToast } from "../../context/useToastContext";
import useEditCourse from "../../hooks/useEditCourse";

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
  const { editCourse, isEditingCourse } = useEditCourse();
  const { showToast } = useToast();

  const handleToggleChange = async () => {
    if (isEditingCourse) {
      showToast("info", "در حال ویرایش وضعیت دوره هستید. لطفا صبر کنید.");
      return;
    }
    await editCourse(
      {
        courseId: course?._id,
        newCourse: {
          ...course,
          isActive: !course?.isActive,
        },
      },
      {
        onSuccess: () => {
          showToast(
            "success",
            course?.isActive
              ? `${course?.name} غیر فعال شد`
              : `${course?.name} فعال شد`
          );
        },
        onError: (error) => {
          showToast(
            "error",
            error?.response?.data?.message ||
              "تغییر وضعیت دوره موفقیت آمیز نبود"
          );
        },
      }
    );
  };

  return (
    <Table.Row>
      <td>{index + 1}</td>
      <td>{course.name}</td>
      <td>{formattedDate(course.startDate)}</td>
      <td>
        <ThemeProvider theme={customTheme}>
          <ToggleSwitch
            checked={course?.isActive}
            onChange={handleToggleChange}
            sizing="md"
            color="green"
            disabled={isEditingCourse}
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
