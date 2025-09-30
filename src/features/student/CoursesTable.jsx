import { useEffect } from "react";
import { useGetUser } from "../../context/useGetUserContext";
import toast from "react-hot-toast";
import { Loader } from "../../ui/Loading";
import NotFound from "../../ui/NotFound";
import Table from "../../ui/Table";
import CoursesRow from "./CoursesRow";

function CoursesTable() {
  const { user, isLoading, isError, error, token } = useGetUser();

  useEffect(() => {
    if (isError || !token) {
      toast.error(error?.response?.data?.message || "اطلاعات کاربری یافت نشد");
    }
  }, [isError, token, error]);

  if (isError || !token) return <NotFound />;

  if (isLoading) return <Loader />;
  return (
    <>
      {!user?.enrolledCourses.length ? (
        <p>شما هنوز در دوره ای ثبت نام نکرده اید.</p>
      ) : (
        <Table>
          <Table.Header>
            <th className="py-2">#</th>
            <th>عنوان دوره</th>
            <th>تاریخ شروع</th>
            <th>تاریخ ثبت نام</th>
            <th>تعداد جلسات</th>
            <th>ظرفیت کل</th>
            <th>ظرفیت باقی مانده</th>
            <th>وضعیت دوره</th>
          </Table.Header>
          <Table.Body>
            {user?.enrolledCourses?.map((course, index) => (
              <CoursesRow key={course._id} course={course} index={index} />
            ))}
          </Table.Body>
        </Table>
      )}
    </>
  );
}

export default CoursesTable;
