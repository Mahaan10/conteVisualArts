import { useEffect } from "react";
import { useGetUser } from "../../context/useGetUserContext";
import toast from "react-hot-toast";
import { Loader } from "../../ui/Loading";
import Table from "../../ui/Table";
import OrdersRow from "./OrdersRow";
import NotFound from "../../ui/NotFound";
import useCourses from "../../hooks/useCourses";

function OrdersTable() {
  const { user, isLoading, isError, error, token } = useGetUser();
  const {
    courses,
    error: coursesError,
    isError: coursesIsError,
    isLoading: coursesIsLoading,
  } = useCourses();

  useEffect(() => {
    if (isError || coursesIsError || !token) {
      toast.error(
        (error || coursesError)?.response?.data?.message ||
          "اطلاعات کاربری یافت نشد"
      );
    }
  }, [isError, token, error, coursesError, coursesIsError]);

  if (isError || !token) return <NotFound />;

  if (isLoading || coursesIsLoading) return <Loader />;

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
            {user?.enrolledCourses.map((enrolledItem, index) => (
              <OrdersRow
                key={enrolledItem._id}
                course={enrolledItem}
                index={index}
                courses={courses}
              />
            ))}
          </Table.Body>
        </Table>
      )}
    </>
  );
}

export default OrdersTable;
