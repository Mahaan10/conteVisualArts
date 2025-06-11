import { CiEdit } from "react-icons/ci";
import { PiTrash } from "react-icons/pi";
import Table from "../../../ui/Table";

function AdminStudentWorksRow({ studentWork, index, onEdit, onDelete }) {
  return (
    <Table.Row>
      <td>{index + 1}</td>
      <td>{studentWork.title}</td>
      <td>{formattedDate(studentWork.date)}</td>
      <td>{studentWork.student.name}</td>
      <td>{studentWork.image}</td>
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

export default AdminStudentWorksRow;

function formattedDate(isoString) {
  return new Date(isoString).toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}
