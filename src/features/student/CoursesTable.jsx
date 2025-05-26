import { useGetUser } from "../../context/useGetUserContext";
import { useToast } from "../../context/useToastContext";
import { Loader } from "../../ui/Loading";
import Table from "../../ui/Table";
import CoursesRow from "./CoursesRow";

function CoursesTable() {
  const { user, isLoading, isError, error, token } = useGetUser();
  const { showToast } = useToast();

  if (isError || !token)
    return showToast(
      "error",
      error?.response?.data?.message || "اطلاعات کاربری یافت نشد"
    );

  if (isLoading) return <Loader />;

  return (
    <Table>
      <Table.Header>
        <th className="py-2">#</th>
        <th>عنوان دوره</th>
        <th>تاریخ شروع</th>
        <th>تعداد جلسات</th>
        <th>ظرفیت</th>
        <th>وضعیت دوره</th>
      </Table.Header>
      <Table.Body>
        {user?.enrolledCourses.map((course, index) => (
          <CoursesRow key={course._id} course={course} index={index} />
        ))}
      </Table.Body>
    </Table>
  );
}

export default CoursesTable;
