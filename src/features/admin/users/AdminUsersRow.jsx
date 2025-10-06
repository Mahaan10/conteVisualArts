import { CiEdit } from "react-icons/ci";
import { PiTrash } from "react-icons/pi";
import Table from "../../../ui/Table";
import formattedDate from "../../../utils/formattedDate";
import { Link } from "react-router-dom";

function AdminUsersRow({ user, index, onEdit, onDelete, courses }) {
  const studentCourses = Array.isArray(user?.enrolledCourses)
    ? user.enrolledCourses.map((course) => course?.course?._id)
    : [];

  const enrolledCourses = courses?.filter((course) =>
    studentCourses?.includes(course?._id)
  );

  return (
    <Table.Row>
      <td>{index + 1}</td>
      <td>{user?.name}</td>
      <td>{formattedDate(user?.createdAt)}</td>
      <td>
        <div className="grid grid-cols-1 gap-2">
          {enrolledCourses && enrolledCourses.length > 0 ? (
            enrolledCourses?.map((course) => (
              <Link
                key={course?._id}
                to={`/courses/${course?._id}`}
                className="p-2 rounded-lg bg-almond-cookie dark:hover:bg-dark-cerulean hover:bg-golden-sand dark:bg-purple-plumeria transition-colors duration-300 cursor-pointer btn w-full justify-center mx-auto"
              >
                {course?.name}
              </Link>
            ))
          ) : (
            <span className="">__</span>
          )}
        </div>
      </td>
      <td>
        <div className="flex items-center justify-center gap-x-4">
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
        </div>
      </td>
    </Table.Row>
  );
}

export default AdminUsersRow;
