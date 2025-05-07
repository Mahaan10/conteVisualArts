import { HiOutlineX } from "react-icons/hi";
import useOutsideClick from "../hooks/useOutsideClick";

function Modal({ onClose, children, title }) {
  const ref = useOutsideClick(onClose);

  return (
    <div className="backdrop-blur-sm fixed top-0 left-0 w-full h-screen bg-linen/50 dark:bg-dark-purple/50 transition-opacity duration-300 ease-in-out z-50">
      <div
        ref={ref}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        rounded-lg bg-whitesmoke text-black dark:text-whitesmoke dark:bg-gray-950 p-4 shadow-lg transition-all duration-500 ease-out
        w-[calc(100vw-25%)] md:max-w-lg max-h-[calc(100vh-25%)] overflow-y-auto h-[calc(100vh-25%)]"
      >
        <div className="flex items-center justify-between border-b border-gray-300 pb-2 mb-6">
          <div className="flex items-center gap-x-2">
            <div className="w-10">
              <img src="images/Logo.jpg" alt="" />
            </div>
            <h1 className="font-bold text-sm md:text-lg">{title}</h1>
          </div>
          <button
            onClick={onClose}
            className="cursor-pointer bg-inherit hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg p-1"
          >
            <HiOutlineX className="w-5 h-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default Modal;
