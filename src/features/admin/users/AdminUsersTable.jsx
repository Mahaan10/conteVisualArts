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
import useCourses from "../../../hooks/useCourses";
import useDeleteUserFromCourse from "../../../hooks/useDeleteUserFromCourse";
import useAddUserToAvailableCourse from "../../../hooks/useAddUserToAvailableCourse";
import ConfirmAdd from "../../../ui/ConfirmAdd";

function AdminUsersTable() {
  const { users, error, isError, isLoading } = useUsers();
  const {
    courses,
    error: coursesError,
    isError: coursesIsError,
    isLoading: coursesIsLoading,
  } = useCourses();

  const { deleteUser, isDeletingUser } = useDeleteUser();
  const { deleteUserFromCourse, isDeletingUserFromCourse } =
    useDeleteUserFromCourse();
  const { addUserToAvailableCourse, isAddingUserToCourse } =
    useAddUserToAvailableCourse();

  const [userToEdit, setUserToEdit] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
  const [courseDeleteDetails, setCourseDeleteDetails] = useState(null);
  const [courseAddDetails, setCourseAddDetails] = useState(null);

  const sortUsers = users?.filter((user) => user?.role === "student") || [];

  const { currentData, currentPage, totalPages, goToPage, setCurrentPage } =
    usePagination(sortUsers, 6);

  if (isLoading || coursesIsLoading) return <Loader />;

  if (isError || coursesIsError) {
    toast.error(
      (error || coursesError)?.response?.data?.message || "اطلاعات یافت نشد"
    );
    return <NotFound />;
  }

  
  const handleDeleteUser = async () => {
    await deleteUser(userToDelete?._id, {
      onSuccess: () => {
        toast.success(`${userToDelete?.name} با موفقیت حذف شد`);
        setUserToDelete(null);
      },
      onError: (err) =>
        toast.error(err?.response?.data?.message || "حذف انجام نشد"),
    });
  };

  
  const handleDeleteUserFromCourse = async () => {
    const { userId, courseId } = courseDeleteDetails;

    await deleteUserFromCourse(
      { userId, courseId },
      {
        onSuccess: () => {
          toast.success("کاربر از دوره حذف شد");
          setCourseDeleteDetails(null);
        },
        onError: (err) =>
          toast.error(err?.response?.data?.message || "حذف انجام نشد"),
      }
    );
  };

  
  const handleAddUserToCourse = async () => {
    const { userId, courseId } = courseAddDetails;

    await addUserToAvailableCourse(
      { userId, courseId },
      {
        onSuccess: () => {
          toast.success("کاربر با موفقیت به دوره اضافه شد");
          setCourseAddDetails(null);
        },
        onError: (err) =>
          toast.error(err?.response?.data?.message || "ثبت انجام نشد"),
      }
    );
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
              <th>شماره همراه</th>
              <th>تاریخ عضویت</th>
              <th>دوره ها</th>
              <th>عملیات</th>
            </Table.Header>
            <Table.Body>
              {currentData.map((user, index) => (
                <AdminUsersRow
                  key={user._id}
                  user={user}
                  courses={courses || []}
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
              onPageChange={(page) => {
                if (page > totalPages) setCurrentPage(1);
                else goToPage(page);
              }}
            />
          </div>
        </>
      )}

      {/* Delete User */}
      {userToDelete && (
        <Modal
          title={`حذف ${userToDelete?.name}`}
          onClose={() => setUserToDelete(null)}
        >
          <ConfirmDelete
            name={userToDelete?.name}
            isDeleting={isDeletingUser}
            onClose={() => setUserToDelete(null)}
            onConfirm={handleDeleteUser}
          />
        </Modal>
      )}

      {/* Edit User */}
      {userToEdit && (
        <Modal title="ویرایش کاربر" onClose={() => setUserToEdit(null)}>
          <UsersForm
            userToEdit={userToEdit}
            courses={courses || []}
            onClose={() => setUserToEdit(null)}
            onConfirmDeleteCourse={
              (data) => setCourseDeleteDetails(data) 
            }
            onConfirmAddCourse={(data) => setCourseAddDetails(data)}
          />
        </Modal>
      )}

      {/* Delete User From Course */}
      {courseDeleteDetails && (
        <Modal
          title="حذف کاربر از دوره"
          onClose={() => setCourseDeleteDetails(null)}
        >
          <ConfirmDelete
            name="این دوره"
            isDeleting={isDeletingUserFromCourse}
            onClose={() => setCourseDeleteDetails(null)}
            onConfirm={handleDeleteUserFromCourse}
          />
        </Modal>
      )}

      {/* Add User To Course */}
      {courseAddDetails && (
        <Modal
          title="افزودن کاربر به دوره"
          onClose={() => setCourseAddDetails(null)}
        >
          <ConfirmAdd
            name="این دوره"
            isAdding={isAddingUserToCourse}
            onClose={() => setCourseAddDetails(null)}
            onConfirm={handleAddUserToCourse}
          />
        </Modal>
      )}
    </>
  );
}

export default AdminUsersTable;
