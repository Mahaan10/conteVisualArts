import { useGetUser } from "../../context/useGetUserContext";
import { useToast } from "../../context/useToastContext";
import { Loader } from "../../ui/Loading";
import Table from "../../ui/Table";
import OrdersRow from "./OrdersRow";

function OrdersTable() {
  const { user, isLoading, isError, error, token } = useGetUser();
  const { showToast } = useToast();

  if (isError || !token)
    return showToast(
      "error",
      error?.response?.data?.message || "اطلاعات کاربری یافت نشد"
    );

  if (isLoading) return <Loader />;

  return (
    <>
      {user?.enrolledCourses.length === 0 ? (
        <p>شما هنوز سفارشی ثبت نکرده اید.</p>
      ) : (
        <Table>
          <Table.Header>
            <th className="py-2">#</th>
            <th>شماره پیگیری</th>
            <th>شرح سفارش</th>
            <th>مبلغ</th>
            <th>تاریخ</th>
            <th>وضعیت پرداخت</th>
          </Table.Header>
          <Table.Body>
            {user?.enrolledCourses.map((course, index) => (
              <OrdersRow key={course._id} course={course} index={index} />
            ))}
          </Table.Body>
        </Table>
      )}
    </>
  );
}

export default OrdersTable;
