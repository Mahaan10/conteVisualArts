import { useGetUser } from "../../context/useGetUserContext";
import { useToast } from "../../context/useToastContext";
import useCourses from "../../hooks/useCourses";
import { Loader } from "../../ui/Loading";
import Table from "../../ui/Table";
import CoursesRow from "./CoursesRow";

function CoursesTable() {
  const { user, isLoading, isError, error, token } = useGetUser();
  const {
    courses,
    error: coursesError,
    isError: coursesIsError,
    isLoading: coursesLoading,
  } = useCourses();
  const { showToast } = useToast();

  if (isError || coursesIsError || !token)
    return showToast(
      "error",
      (error || coursesError)?.response?.data?.message ||
        "اطلاعات کاربری یافت نشد"
    );

  if (isLoading || coursesLoading) return <Loader />;

  //find user courses ids
  const userCourses = user?.enrolledCourses.map((courses) => courses._id);
  //filter courses that user enrolled
  const filterUserCourses = courses.filter((course) =>
    userCourses.includes(course._id)
  );

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
        {filterUserCourses.map((course, index) => (
          <CoursesRow key={course._id} course={course} index={index} />
        ))}
      </Table.Body>
    </Table>
  );
}

export default CoursesTable;
