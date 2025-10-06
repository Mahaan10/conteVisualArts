import { Link } from "react-router-dom";
import Table from "../../ui/Table";
import formattedDate, { formattedTime } from "../../utils/formattedDate";
import toPersianNumbersWithComma from "../../utils/toPersianNumbers";

function OrdersRow({ course, index }) {
  return (
    <Table.Row>
      <td className="py-2">{index + 1}</td>
      <td className="font-iranian-sans">شماره پیگیری پرداخت</td>
      <td>
        <Link
          to={`/courses/${course?.course?._id}`}
          className="p-2 rounded-lg bg-almond-cookie dark:hover:bg-dark-cerulean hover:bg-golden-sand dark:bg-purple-plumeria transition-colors duration-300 cursor-pointer btn w-auto justify-center mx-auto"
        >
          {course?.course?.name}
        </Link>
      </td>
      <td>{toPersianNumbersWithComma(course?.course?.price)} تومان</td>
      <td>{formattedDate(course?.enrolledAt)}</td>
      <td>{formattedTime(course?.enrolledAt)}</td>
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
