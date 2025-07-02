import { HiArrowRight } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-whitesmoke dark:bg-gray-950 flex items-center justify-center">
      <div className="container xl:max-w-screen-xl">
        <div className="sm:max-w-sm mx-auto flex justify-center items-center">
          <div>
            <h1 className="mb-8 dark:text-whitesmoke text-center text-2xl font-semibold">
              عدم نمایش اطلاعات
            </h1>
            <button
              className="flex items-center gap-x-4 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-600 transition-colors mx-auto"
              onClick={() => navigate(-1)}
            >
              <HiArrowRight className="w-6 h-6" />
              <span>بازگشت</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
