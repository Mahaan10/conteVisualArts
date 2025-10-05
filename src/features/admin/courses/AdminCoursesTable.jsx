import { useState } from "react";
import useCourses from "../../../hooks/useCourses";
import useDeleteCourse from "../../../hooks/useDeleteCourse";
import usePagination from "../../../hooks/usePagination";
import { Loader } from "../../../ui/Loading";
import Table from "../../../ui/Table";
import AdminCoursesRow from "./AdminCoursesRow";
import Pagination from "../../../ui/Pagination";
import Modal from "../../../ui/Modal";
import ConfirmDelete from "../../../ui/ConfirmDelete";
import CoursesForm from "./CoursesForm";
import NotFound from "../../../ui/NotFound";
import toast from "react-hot-toast";

function AdminCoursesTable() {
  const { courses, error, isError, isLoading } = useCourses();
  const { deleteCourse, isDeletingCourse } = useDeleteCourse();
  const [courseToEdit, setCourseToEdit] = useState(null);
  const [courseToDelete, setCourseToDelete] = useState(null);
  const { currentData, currentPage, totalPages, goToPage } = usePagination(
    courses,
    6
  );

  if (isLoading) return <Loader />;

  if (isError) {
    toast.error(error?.response?.data?.message || "اطلاعات یافت نشد");
    return <NotFound />;
  }

  const handleDelete = async () => {
    await deleteCourse(courseToDelete?._id, {
      onSuccess: () => {
        toast.success(`${courseToDelete?.name} با موفقیت حذف شد`);
        setCourseToDelete(null);
      },
      onError: (err) =>
        toast.error(err?.response?.data?.message || "حذف انجام نشد"),
    });
  };
  return (
    <>
      {courses?.length === 0 ? (
        <p>هنوز دوره ای تعریف نشده است</p>
      ) : (
        <>
          <Table>
            <Table.Header>
              <th className="py-2">#</th>
              <th>عنوان</th>
              <th>وضعیت</th>
              <th>جلسات</th>
              <th>ظرفیت</th>
              <th>هنرجویان</th>
              <th>ظرفیت باقی مانده</th>
              <th>رده سنی</th>
              <th>آیتم</th>
              <th>قیمت</th>
              <th>عملیات</th>
            </Table.Header>
            <Table.Body>
              {currentData.map((course, index) => (
                <AdminCoursesRow
                  key={course._id}
                  course={course}
                  index={(currentPage - 1) * 6 + index}
                  onEdit={() => setCourseToEdit(course)}
                  onDelete={() => setCourseToDelete(course)}
                />
              ))}
            </Table.Body>
          </Table>
          <div className="flex justify-center mt-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={goToPage}
            />
          </div>
        </>
      )}
      {/* Delete Course */}
      {courseToDelete && (
        <Modal
          title={`حذف ${courseToDelete?.name}`}
          onClose={() => setCourseToDelete(null)}
        >
          <ConfirmDelete
            name={courseToDelete?.name}
            isDeleting={isDeletingCourse}
            disabled={false}
            onClose={() => setCourseToDelete(null)}
            onConfirm={handleDelete}
          />
        </Modal>
      )}
      {/* Edit Course */}
      {courseToEdit && (
        <Modal title="ویرایش دوره" onClose={() => setCourseToEdit(null)}>
          <CoursesForm
            courseToEdit={courseToEdit}
            onClose={() => setCourseToEdit(null)}
          />
        </Modal>
      )}
    </>
  );
}

export default AdminCoursesTable;
