import Table from "../../ui/Table";

function OrdersRow({ course, index }) {
  return (
    <Table.Row>
      <td className="py-2">{index + 1}</td>
      <td className="font-iranian-sans">شماره پیگیری پرداخت</td>
      <td>{course.name}</td>
      <td>{course.price} تومان</td>
      <td>{formattedDate(course.enrolledAt)}</td>
      <td>
        {course.paymentStatus === "paid"
          ? "موفق ✔️"
          : course.paymentStatus === "pending"
          ? "در حال بررسی ⏳"
          : "ناموفق ❌"}
      </td>
    </Table.Row>
  );
}

export default OrdersRow;

function formattedDate(isoString) {
  return new Date(isoString).toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}
