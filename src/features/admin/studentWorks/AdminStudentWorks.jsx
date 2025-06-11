import { PiPlus } from "react-icons/pi";
import { useState } from "react";
import Modal from "../../../ui/Modal";
import AdminStudentWorksTable from "./AdminStudentWorksTable";
import StudentWorksForm from "./StudentWorksForm";

function AdminStudentWorks() {
  const [isOpen, setIsOpen] = useState(false);
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
          <StudentWorksForm onClose={() => setIsOpen(false)} />
        </Modal>
      )}
    </div>
  );
}

export default AdminStudentWorks;
