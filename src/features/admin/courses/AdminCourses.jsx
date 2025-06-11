import { PiPlus } from "react-icons/pi";
import { useState } from "react";
import AdminCoursesTable from "./AdminCoursesTable";
import Modal from "../../../ui/Modal";
import CoursesForm from "./CoursesForm";

function AdminCourses() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="container">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">دوره ها</h1>
        <div className="flex items-center">
          <button className="btn h-10 w-36" onClick={() => setIsOpen(!isOpen)}>
            <span>افزودن دوره جدید</span>
            <PiPlus className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="w-full h-[0.5px] my-10 bg-light-shade-yellow dark:bg-dark-purple transition-colors duration-300"></div>
      <AdminCoursesTable />
      {/* Add New Course */}
      {isOpen && (
        <Modal title="افزودن دوره جدید" onClose={() => setIsOpen(false)}>
          <CoursesForm onClose={() => setIsOpen(false)} />
        </Modal>
      )}
    </div>
  );
}

export default AdminCourses;
