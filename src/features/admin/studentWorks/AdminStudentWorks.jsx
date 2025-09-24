import { PiPlus } from "react-icons/pi";
import { useState } from "react";
import Modal from "../../../ui/Modal";
import AdminStudentWorksTable from "./AdminStudentWorksTable";
import StudentWorksForm from "./StudentWorksForm";
import useCourses from "../../../hooks/useCourses";
import useUsers from "../../../hooks/useUsers";
import NotFound from "../../../ui/NotFound";
import { Loader } from "../../../ui/Loading";
import toast from "react-hot-toast";

function AdminStudentWorks() {
  const [isOpen, setIsOpen] = useState(false);
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

  const sortUsers = users?.filter((user) => user?.role === "student") || [];

  if (coursesIsLoading || usersIsLoading) return <Loader />;
  if (coursesIsError || usersIsError) {
    toast.error(
      coursesError?.response?.data?.message ||
        usersError?.response?.data?.message ||
        "اطلاعات یافت نشد"
    );
    return <NotFound />;
  }
  return (
    <div className="container">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">آثار هنرجویان</h1>
        <div className="flex items-center">
          <button className="btn h-10 w-36" onClick={() => setIsOpen(!isOpen)}>
            <span>افزودن اثر جدید</span>
            <PiPlus className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="w-full h-[0.5px] my-10 bg-light-shade-yellow dark:bg-dark-purple transition-colors duration-300"></div>
      <AdminStudentWorksTable />
      {/* Add New Art */}
      {isOpen && (
        <Modal title="افزودن اثر جدید" onClose={() => setIsOpen(false)}>
          <StudentWorksForm
            onClose={() => setIsOpen(false)}
            courses={courses}
            students={sortUsers}
          />
        </Modal>
      )}
    </div>
  );
}

export default AdminStudentWorks;
