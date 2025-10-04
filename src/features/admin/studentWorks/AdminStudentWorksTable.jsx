import { useState } from "react";
import usePagination from "../../../hooks/usePagination";
import { Loader } from "../../../ui/Loading";
import Table from "../../../ui/Table";
import Pagination from "../../../ui/Pagination";
import Modal from "../../../ui/Modal";
import ConfirmDelete from "../../../ui/ConfirmDelete";
import useStudentWorks from "../../../hooks/useStudentWorks";
import useDeleteStudentWorks from "../../../hooks/useDeleteStudentWorks";
import AdminStudentWorksRow from "./AdminStudentWorksRow";
import StudentWorksForm from "./StudentWorksForm";
import NotFound from "../../../ui/NotFound";
import useCourses from "../../../hooks/useCourses";
import useUsers from "../../../hooks/useUsers";
import toast from "react-hot-toast";

function AdminStudentWorksTable() {
  const { studentWorks, error, isError, isLoading } = useStudentWorks();
  const {
    courses,
    error: coursesError,
    isError: coursesIsError,
    isLoading: coursesIsLoading,
  } = useCourses();
  const {
    users,
    error: usersError,
    isError: usersIsError,
    isLoading: usersIsLoading,
  } = useUsers();
  const { deleteArtWork, isDeletingArtWork } = useDeleteStudentWorks();
  const [artWorkToEdit, setArtWorkToEdit] = useState(null);
  const [artWorkToDelete, setArtWorkToDelete] = useState(null);

  const { currentData, currentPage, totalPages, goToPage } = usePagination(
    studentWorks,
    6
  );

  const sortUsers = users?.filter((user) => user?.role === "student") || [];

  if (isLoading || coursesIsLoading || usersIsLoading) return <Loader />;
  if (isError || coursesIsError || usersIsError) {
    toast.error(
      error?.response?.data?.message ||
        coursesError?.response?.data?.message ||
        usersError?.response?.data?.message ||
        "اطلاعات یافت نشد"
    );
    return <NotFound />;
  }

  const handleDelete = async () => {
    await deleteArtWork(artWorkToDelete?._id, {
      onSuccess: () => {
        toast.success(`${artWorkToDelete?.title} با موفقیت حذف شد`);
        setArtWorkToDelete(null);
      },
      onError: (err) => {
        toast.error(err?.response?.data?.message || "حذف انجام نشد");
      },
    });
  };

  return (
    <>
      {studentWorks?.length === 0 ? (
        <p>هنوز اثری تعریف نشده است</p>
      ) : (
        <>
          <Table>
            <Table.Header>
              <th className="py-2">#</th>
              <th>عنوان</th>
              <th>تاریخ</th>
              <th>عکس اثر</th>
              <th>دوره</th>
              <th>عملیات</th>
            </Table.Header>
            <Table.Body>
              {currentData.map((studentWork, index) => (
                <AdminStudentWorksRow
                  key={studentWork?._id}
                  studentWork={studentWork}
                  index={(currentPage - 1) * 6 + index}
                  onEdit={() => setArtWorkToEdit(studentWork)}
                  onDelete={() => setArtWorkToDelete(studentWork)}
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
      {artWorkToDelete && (
        <Modal
          title={`حذف ${artWorkToDelete?.title}`}
          onClose={() => setArtWorkToDelete(null)}
        >
          <ConfirmDelete
            name={artWorkToDelete?.title}
            isDeleting={isDeletingArtWork}
            disabled={false}
            onClose={() => setArtWorkToDelete(null)}
            onConfirm={handleDelete}
          />
        </Modal>
      )}
      {/* Edit Course */}
      {artWorkToEdit && (
        <Modal title="ویرایش دوره" onClose={() => setArtWorkToEdit(null)}>
          <StudentWorksForm
            artWorkToEdit={artWorkToEdit}
            onClose={() => setArtWorkToEdit(null)}
            courses={courses}
            students={sortUsers}
          />
        </Modal>
      )}
    </>
  );
}

export default AdminStudentWorksTable;
