import Table from "../../ui/Table";
import formattedDate from "../../utils/formattedDate";

function OrdersRow({ course, index }) {
  return (
    <Table.Row>
      <td className="py-2">{index + 1}</td>
      <td className="font-iranian-sans">شماره پیگیری پرداخت</td>
      <td>{course?.name}</td>
      <td>{course?.price} تومان</td>
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
