import { CiEdit } from "react-icons/ci";
import { PiTrash } from "react-icons/pi";
import Table from "../../../ui/Table";
import formattedDate from "../../../utils/formattedDate";

function AdminStudentWorksRow({ studentWork, index, onEdit, onDelete }) {
  console.log(studentWork);

  return (
    <Table.Row>
      <td>{index + 1}</td>
      <td>{studentWork.title}</td>
      <td>{formattedDate(studentWork.date)}</td>
      <td>
        <div className="flex items-center justify-center">
          <img
            src={studentWork.Image}
            alt={studentWork.title}
            className="w-10 h-10 rounded-md object-cover"
          />
        </div>
      </td>
      <td>{studentWork.course}</td>
      <td>{studentWork.student?.name || "نامشخص"}</td>
      <td className="flex gap-x-4 justify-center">
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

export default AdminStudentWorksRow;
