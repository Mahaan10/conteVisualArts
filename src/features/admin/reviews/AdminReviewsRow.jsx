import { Link } from "react-router-dom";
import Table from "../../../ui/Table";
import formattedDate from "../../../utils/formattedDate";
import { PiTrash } from "react-icons/pi";

function AdminReviewsRow({ review, index, onDelete }) {
  return (
    <Table.Row>
      <td>{index + 1}</td>
      <td>
        <Link
          to={`/courses/${review?.course?._id}`}
          className="p-2 rounded-lg bg-almond-cookie dark:hover:bg-dark-cerulean hover:bg-golden-sand dark:bg-purple-plumeria transition-colors duration-300 cursor-pointer btn justify-center mx-auto"
        >
          {review?.course?.name}
        </Link>
      </td>
      <td>{review?.user?.name}</td>
      <td>{review?.user?.phone}</td>
      <td>{formattedDate(review?.createdAt)}</td>
      <td className="leading-5">{review?.review}</td>
      <td>
        <button
          className="btn text-whitesmoke w-24 bg-red-600 hover:bg-red-700 mx-auto"
          onClick={onDelete}
        >
          <span>حذف</span>
          <PiTrash className="w-5 h-5" />
        </button>
      </td>
    </Table.Row>
  );
}

export default AdminReviewsRow;
