import { Link } from "react-router-dom";
import Table from "../../ui/Table";
import formattedDate from "../../utils/formattedDate";
import toPersianNumbersWithComma from "../../utils/toPersianNumbers";

function OrdersRow({ course, index, courses }) {
  const courseDetails = courses?.find(
    (courseItem) => courseItem?._id === course?._id
  );

  return (
    <Table.Row>
      <td className="py-2">{index + 1}</td>
      <td className="font-iranian-sans">شماره پیگیری پرداخت</td>
      <td>
        <Link
          to={`/courses/${courseDetails?._id}`}
          className="p-2 rounded-lg bg-almond-cookie dark:hover:bg-dark-cerulean hover:bg-golden-sand dark:bg-purple-plumeria transition-colors duration-300 cursor-pointer btn justify-center mx-auto"
        >
          {courseDetails?.name}
        </Link>
      </td>
      <td>{toPersianNumbersWithComma(courseDetails?.price)} تومان</td>
      <td>{formattedDate(course?.enrolledAt)}</td>
      <td>
        {course?.paymentStatus === "paid"
          ? "موفق ✔️"
          : course?.paymentStatus === "pending"
          ? "در حال بررسی ⏳"
          : "ناموفق ❌"}
      </td>
    </Table.Row>
  );
}

export default OrdersRow;
