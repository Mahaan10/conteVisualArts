import { useEffect } from "react";
import { useGetUser } from "../../context/useGetUserContext";
import toast from "react-hot-toast";
import { Loader } from "../../ui/Loading";
import Table from "../../ui/Table";
import OrdersRow from "./OrdersRow";
import NotFound from "../../ui/NotFound";

function OrdersTable() {
  const { user, isLoading, isError, error, token } = useGetUser();
  useEffect(() => {
    if (isError || !token) {
      toast.error(error?.response?.data?.message || "اطلاعات کاربری یافت نشد");
    }
  }, [isError, token, error]);

  if (isError || !token) {
    return <NotFound />;
  }

  if (isLoading) return <Loader />;

  return (
    <>
      {!user?.enrolledCourses.length ? (
        <p>شما هنوز سفارشی ثبت نکرده اید.</p>
      ) : (
        <Table>
          <Table.Header>
            <th className="py-2">#</th>
            <th>شماره پیگیری</th>
            <th>شرح سفارش</th>
            <th>مبلغ</th>
            <th>تاریخ پرداخت</th>
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
