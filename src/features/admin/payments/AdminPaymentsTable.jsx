import { useEffect, useMemo, useState } from "react";
import usePayments from "../../../hooks/usePayments";
import toast from "react-hot-toast";
import NotFound from "../../../ui/NotFound";
import { Loader } from "../../../ui/Loading";
import Table from "../../../ui/Table";
import AdminPaymentsRow from "./AdminPaymentsRow";
import Pagination from "../../../ui/Pagination";

function AdminPaymentsTable({ paymentsStatusFilter }) {
  const { paymentsData, isLoading, isError, error } = usePayments();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    if (isError) {
      toast.error(error?.response?.data?.message || "اطلاعات پرداخت یافت نشد");
    }
  }, [isError, error]);

  const filteredPayments = useMemo(() => {
    if (!paymentsData) return [];

    switch (paymentsStatusFilter) {
      case "all":
        return paymentsData;
      case "failed":
        return paymentsData?.filter((payment) => payment?.status === "pending");
      case "success":
      default:
        return paymentsData?.filter((payment) => payment.status === "success");
    }
  }, [paymentsData, paymentsStatusFilter]);

  useEffect(() => {
    setCurrentPage(1);
  }, [paymentsStatusFilter]);

  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredPayments.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  useEffect(() => {
    if (isError) {
      toast.error(error?.response?.data?.message || "اطلاعات کاربری یافت نشد");
    }
  }, [isError, error]);

  if (isError) return <NotFound />;

  if (isLoading) return <Loader />;

  return (
    <>
      {filteredPayments?.length === 0 ? (
        <p>شما هنوز سفارشی ثبت نکرده اید.</p>
      ) : (
        <>
          <Table>
            <Table.Header>
              <th className="py-2">#</th>
              <th>شماره پیگیری پرداخت</th>
              <th>کاربر</th>
              <th>شماره موبایل</th>
              <th>دوره</th>
              <th>مبلغ پرداختی</th>
              <th>مبلغ خالص</th>
              <th>تاریخ</th>
              <th>ساعت</th>
              <th>وضعیت</th>
            </Table.Header>
            <Table.Body>
              {currentData?.map((payment, index) => (
                <AdminPaymentsRow
                  key={payment._id}
                  payment={payment}
                  index={(currentPage - 1) * 6 + index}
                />
              ))}
            </Table.Body>
          </Table>
          <div className="flex justify-center mt-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </>
      )}
    </>
  );
}

export default AdminPaymentsTable;
