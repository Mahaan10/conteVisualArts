import { useState } from "react";
import { useToast } from "../../../context/useToastContext";
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

function AdminStudentWorksTable() {
  const { studentWorks, error, isError, isLoading } = useStudentWorks();
  const { deleteArtWork, isDeletingArtWork } = useDeleteStudentWorks();
  const [artWorkToEdit, setArtWorkToEdit] = useState(null);
  const [artWorkToDelete, setArtWorkToDelete] = useState(null);
  const { showToast } = useToast();
  const { currentData, currentPage, totalPages, goToPage } = usePagination(
    studentWorks,
    6
  );
  console.log(studentWorks);
  if (isLoading) return <Loader />;
  if (isError)
    return showToast(
      "error",
      error?.response?.data?.message || "اطلاعات یافت نشد"
    );

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
              <th>هنرجو</th>
              <th>عکس اثر</th>
              <th>عملیات</th>
            </Table.Header>
            <Table.Body>
              {currentData.map((studentWork, index) => (
                <AdminStudentWorksRow
                  key={studentWork._id}
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
          title={`حذف ${artWorkToDelete?.name}`}
          onClose={() => setArtWorkToDelete(null)}
        >
          <ConfirmDelete
            name={artWorkToDelete?.title}
            isDeleting={isDeletingArtWork}
            disabled={false}
            onClose={() => setArtWorkToDelete(null)}
            onConfirm={async () =>
              await deleteArtWork(artWorkToDelete?._id, {
                onSuccess: () => {
                  setArtWorkToDelete(null);
                  showToast(
                    "success",
                    `${artWorkToDelete?.title} با موفقیت حذف شد`
                  );
                },
              })
            }
          />
        </Modal>
      )}
      {/* Edit Course */}
      {artWorkToEdit && (
        <Modal title="ویرایش دوره" onClose={() => setArtWorkToEdit(null)}>
          <StudentWorksForm
            artWorkToEdit={artWorkToEdit}
            onClose={() => setArtWorkToEdit(null)}
          />
        </Modal>
      )}
    </>
  );
}

export default AdminStudentWorksTable;
