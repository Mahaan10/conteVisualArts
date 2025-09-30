import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { IoMdRemove } from "react-icons/io";
import { Loader } from "./Loading";

function ConfirmAdd({ name, onClose, disabled, onConfirm, isAdding }) {
  return (
    <div className="mb-4 mx-5">
      <h2 className="mb-4">{`آیا از اضافه کردن ${name} مطمئن هستید ؟`}</h2>
      <div className="flex justify-between items-center gap-x-16">
        <button
          className="btn w-24 cursor-pointer flex items-center justify-between flex-1 bg-red-600"
          onClick={onConfirm}
          disabled={disabled}
        >
          {isAdding ? <Loader /> : <span>تایید</span>}
          <IoCheckmarkDoneSharp className="w-5 h-5" />
        </button>
        <button
          className="btn w-24 cursor-pointer flex items-center justify-between flex-1 bg-teal-600"
          onClick={onClose}
          disabled={disabled}
        >
          <span>لغو</span>
          <IoMdRemove className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default ConfirmAdd;
