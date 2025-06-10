import useCourses from "../../hooks/useCourses";
import Table from "../../ui/Table";
import { PiPlus } from "react-icons/pi";
import AdminCoursesRow from "./AdminCoursesRow";
import useDeleteCourse from "../../hooks/useDeleteCourse";
import { useState } from "react";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useToast } from "../../context/useToastContext";
import CoursesForm from "./CoursesForm";
import { Loader } from "../../ui/Loading";

function AdminCoursesTable() {
  const { courses, error, isError, isLoading } = useCourses();
  const { deleteCourse, isDeletingCourse } = useDeleteCourse();
  const [courseToEdit, setCourseToEdit] = useState(null);
  const [courseToDelete, setCourseToDelete] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const { showToast } = useToast();
  console.log(courses);
  if (isLoading) return <Loader />;
  if (isError)
    return showToast(
      "error",
      error?.response?.data?.message || "اطلاعات یافت نشد"
    );

  return (
    <>
      <div className="flex items-center justify-end my-8">
        <button className="btn h-10 w-36" onClick={() => setIsOpen(!isOpen)}>
          <span>افزودن دوره جدید</span>
          <PiPlus className="w-5 h-5" />
        </button>
      </div>
      {courses?.length === 0 ? (
        <p>هنوز دوره ای تعریف نشده است</p>
      ) : (
        <Table>
          <Table.Header>
            <th className="py-2">#</th>
            <th>عنوان</th>
            <th>تاریخ شروع</th>
            <th>وضعیت</th>
            <th>جلسات</th>
            <th>ظرفیت</th>
            <th>هنرجویان</th>
            <th>قیمت</th>
            <th>عملیات</th>
          </Table.Header>
          <Table.Body>
            {courses.map((course, index) => (
              <AdminCoursesRow
                key={course._id}
                course={course}
                index={index}
                onEdit={() => setCourseToEdit(course)}
                onDelete={() => setCourseToDelete(course)}
              />
            ))}
          </Table.Body>
        </Table>
      )}
      {/* Add New Course */}
      {isOpen && (
        <Modal title="افزودن دوره جدید" onClose={() => setIsOpen(false)}>
          <CoursesForm onClose={() => setIsOpen(false)} />
        </Modal>
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
            onConfirm={async () =>
              await deleteCourse(courseToDelete?._id, {
                onSuccess: () => {
                  setCourseToDelete(null);
                  showToast(
                    "success",
                    `${courseToDelete?.name} با موفقیت حذف شد`
                  );
                },
              })
            }
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
