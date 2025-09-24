import { useState } from "react";
import usePagination from "../../../hooks/usePagination";
import { Loader } from "../../../ui/Loading";
import Table from "../../../ui/Table";
import Pagination from "../../../ui/Pagination";
import Modal from "../../../ui/Modal";
import ConfirmDelete from "../../../ui/ConfirmDelete";
import useUsers from "../../../hooks/useUsers";
import useDeleteUser from "../../../hooks/useDeleteUser";
import AdminUsersRow from "./AdminUsersRow";
import UsersForm from "./UsersForm";
import NotFound from "../../../ui/NotFound";
import toast from "react-hot-toast";

function AdminUsersTable() {
  const { users, error, isError, isLoading } = useUsers();
  const { deleteUser, isDeletingUser } = useDeleteUser();
  const [userToEdit, setUserToEdit] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);

  const sortUsers = users?.filter((user) => user?.role === "student") || [];

  const { currentData, currentPage, totalPages, goToPage } = usePagination(
    sortUsers,
    6
  );

  if (isLoading) return <Loader />;
  if (isError) {
    toast.error(error?.response?.data?.message || "اطلاعات یافت نشد");
    return <NotFound />;
  }

  const handleDelete = async () => {
    await deleteUser(userToDelete?._id, {
      onSuccess: () => {
        toast.success(`${userToDelete?.name} با موفقیت حذف شد`);
        setUserToDelete(null);
      },
      onError: (err) =>
        toast.error(err?.response?.data?.message || "حذف انجام نشد"),
    });
  };

  return (
    <>
      {sortUsers?.length === 0 ? (
        <p>هنوز کاربری ثبت نام نکرده است</p>
      ) : (
        <>
          <Table>
            <Table.Header>
              <th className="py-2">#</th>
              <th>نام</th>
              <th>تاریخ عضویت</th>
              <th>دوره ها</th>
              <th>عملیات</th>
            </Table.Header>
            <Table.Body>
              {currentData.map((user, index) => (
                <AdminUsersRow
                  key={user._id}
                  user={user}
                  index={(currentPage - 1) * 6 + index}
                  onEdit={() => setUserToEdit(user)}
                  onDelete={() => setUserToDelete(user)}
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
      {userToDelete && (
        <Modal
          title={`حذف ${userToDelete?.name}`}
          onClose={() => setUserToDelete(null)}
        >
          <ConfirmDelete
            name={userToDelete?.name}
            isDeleting={isDeletingUser}
            disabled={false}
            onClose={() => setUserToDelete(null)}
            onConfirm={handleDelete}
          />
        </Modal>
      )}
      {/* Edit Course */}
      {userToEdit && (
        <Modal title="ویرایش کاربر" onClose={() => setUserToEdit(null)}>
          <UsersForm
            userToEdit={userToEdit}
            onClose={() => setUserToEdit(null)}
          />
        </Modal>
      )}
    </>
  );
}

export default AdminUsersTable;
