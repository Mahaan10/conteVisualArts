import { useEffect } from "react";
import { useGetUser } from "../../context/useGetUserContext";
import toast from "react-hot-toast";
import { Loader } from "../../ui/Loading";
import NotFound from "../../ui/NotFound";
import Table from "../../ui/Table";
import CoursesRow from "./CoursesRow";
import useCourses from "../../hooks/useCourses";

function CoursesTable() {
  const { user, isLoading, isError, error, token } = useGetUser();
  const {
    courses,
    error: coursesError,
    isError: coursesIsError,
    isLoading: coursesIsLoading,
  } = useCourses();

  const studentCourses = user?.enrolledCourses?.map((course) => course._id);

  const enrolledCourses = courses?.filter((course) =>
    studentCourses?.includes(course?._id)
  );

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
        <p>شما هنوز در دوره ای ثبت نام نکرده اید.</p>
      ) : (
        <Table>
          <Table.Header>
            <th className="py-2">#</th>
            <th>عنوان دوره</th>
            <th>تاریخ شروع دوره</th>
            <th>تعداد جلسات</th>
            <th>ظرفیت کل</th>
            <th>ظرفیت باقی مانده</th>
            <th>وضعیت دوره</th>
          </Table.Header>
          <Table.Body>
            {enrolledCourses.map((course, index) => (
              <CoursesRow key={course._id} course={course} index={index} />
            ))}
          </Table.Body>
        </Table>
      )}
    </>
  );
}

export default CoursesTable;
