import toast from "react-hot-toast";
import usePagination from "../../../hooks/usePagination";
import useReviews from "../../../hooks/useReviews";
import { Loader } from "../../../ui/Loading";
import NotFound from "../../../ui/NotFound";
import Table from "../../../ui/Table";
import Pagination from "../../../ui/Pagination";
import AdminReviewsRow from "./AdminReviewsRow";
import { useState } from "react";
import Modal from "../../../ui/Modal";
import ConfirmDelete from "../../../ui/ConfirmDelete";
import useDeleteReview from "../../../hooks/useDeleteReview";

function AdminReviewsTable() {
  const { reviews, error, isError, isLoading } = useReviews();
  const { deleteReview, isDeletingReview } = useDeleteReview();
  const [reviewToDelete, setReviewToDelete] = useState(null);
  const { currentData, currentPage, totalPages, goToPage } = usePagination(
    reviews,
    6
  );

  if (isLoading) return <Loader />;

  if (isError) {
    toast.error(error?.response?.data?.message || "اطلاعات یافت نشد");
    return <NotFound />;
  }

  const handleDelete = async () => {
    await deleteReview(reviewToDelete?._id, {
      onSuccess: () => {
        toast.success(
          `کامنت ${reviewToDelete?.user?.name} از ${reviewToDelete?.course?.name} با موفقیت حذف شد`
        );
        setReviewToDelete(null);
      },
    });
  };
  return (
    <>
      {reviews?.length === 0 ? (
        <p>هنوز کامنتی دریافت نشده است</p>
      ) : (
        <>
          <Table>
            <Table.Header>
              <th className="py-2">#</th>
              <th>دوره</th>
              <th>کاربر</th>
              <th>شماره همراه</th>
              <th>تاریخ ثبت</th>
              <th>شرح</th>
              <th>عملیات</th>
            </Table.Header>
            <Table.Body>
              {currentData?.map((review, index) => (
                <AdminReviewsRow
                  key={review?._id}
                  review={review}
                  index={(currentPage - 1) * 6 + index}
                  onDelete={() => setReviewToDelete(review)}
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
      {/* Delete Review */}
      {reviewToDelete && (
        <Modal
          title={`حذف کامنت ${reviewToDelete?.user?.name} از ${reviewToDelete?.course?.name}`}
          onClose={() => setReviewToDelete(null)}
        >
          <ConfirmDelete
            name={` کامنت ${reviewToDelete?.user?.name} از ${reviewToDelete?.course?.name}`}
            isDeleting={isDeletingReview}
            disabled={false}
            onClose={() => setReviewToDelete(null)}
            onConfirm={handleDelete}
          />
        </Modal>
      )}
    </>
  );
}

export default AdminReviewsTable;
