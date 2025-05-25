import Table from "../../ui/Table";

function OrdersRow({ course, index }) {
  return (
    <Table.Row>
      <td>{index + 1}</td>
      <td>شماره پیگیری پرداخت</td>
      <td>{course.course}</td>
      <td>{course.price} تومان</td>
      <td>تاریخ و ساعت پرداخت</td>
      <td>{course.reserved ? "رزرو شده" : "عدم رزرو"}</td>
    </Table.Row>
  );
}

export default OrdersRow;
