import { useState } from "react";
import { useToast } from "../../../context/useToastContext";
import usePagination from "../../../hooks/usePagination";
import { Loader } from "../../../ui/Loading";
import Table from "../../../ui/Table";
import Pagination from "../../../ui/Pagination";
import Modal from "../../../ui/Modal";
import ConfirmDelete from "../../../ui/ConfirmDelete";
import useNews from "../../../hooks/useNews";
import useDeleteNews from "../../../hooks/useDeleteNews";
import AdminNewsRow from "./AdminNewsRow";
import NewsForm from "./NewsForm";
import NotFound from "../../../ui/NotFound";

function AdminNewsTable() {
  const { news, error, isError, isLoading } = useNews();
  const { deleteNews, isDeletingNews } = useDeleteNews();
  const [newsToEdit, setNewsToEdit] = useState(null);
  const [newsToDelete, setNewsToDelete] = useState(null);
  const { showToast } = useToast();

  const { currentData, currentPage, totalPages, goToPage } = usePagination(
    news,
    6
  );

  if (isLoading) return <Loader />;
  if (isError) {
    showToast("error", error?.response?.data?.message || "اطلاعات یافت نشد");
    return <NotFound />;
  }

  const handleDelete = async () =>
    await deleteNews(newsToDelete?._id, {
      onSuccess: () => {
        setNewsToDelete(null);
        showToast("success", `${newsToDelete?.title} با موفقیت حذف شد`);
      },
    });

  return (
    <>
      {news?.length === 0 ? (
        <p>هنوز رویدادی تعریف نشده است</p>
      ) : (
        <>
          <Table>
            <Table.Header>
              <th className="py-2">#</th>
              <th>عنوان</th>
              <th>تاریخ انتشار</th>
              <th>آخرین بروزرسانی</th>
              <th>عملیات</th>
            </Table.Header>
            <Table.Body>
              {currentData.map((news, index) => (
                <AdminNewsRow
                  key={news._id}
                  news={news}
                  index={(currentPage - 1) * 6 + index}
                  onEdit={() => setNewsToEdit(news)}
                  onDelete={() => setNewsToDelete(news)}
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
      {newsToDelete && (
        <Modal
          title={`حذف ${newsToDelete?.name}`}
          onClose={() => setNewsToDelete(null)}
        >
          <ConfirmDelete
            name={newsToDelete?.title}
            isDeleting={isDeletingNews}
            disabled={false}
            onClose={() => setNewsToDelete(null)}
            onConfirm={handleDelete}
          />
        </Modal>
      )}
      {/* Edit Course */}
      {newsToEdit && (
        <Modal title="ویرایش دوره" onClose={() => setNewsToEdit(null)}>
          <NewsForm
            newsToEdit={newsToEdit}
            onClose={() => setNewsToEdit(null)}
          />
        </Modal>
      )}
    </>
  );
}

export default AdminNewsTable;
