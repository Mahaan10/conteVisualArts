import useCourses from "../../hooks/useCourses";
import Table from "../../ui/Table";

function AdminCoursesTable() {
  const { courses, error, isError, isLoading } = useCourses();
  return (
    <>
      {courses?.length === 0 ? (
        <p>هنوز دوره ای تعریف نشده است</p>
      ) : (
        <Table>
          <Table.Header>
            <th className="py-2">#</th>
            <th>عنوان دوره</th>
            <th>تاریخ شروع</th>
            <th>تعداد جلسات</th>
            <th>ظرفیت</th>
            <th>وضعیت دوره</th>
          </Table.Header>
          <Table.Body></Table.Body>
        </Table>
      )}
    </>
  );
}

export default AdminCoursesTable;
