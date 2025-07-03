import { Button, Spinner } from "flowbite-react";
import { HiArrowRight } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-whitesmoke dark:bg-gray-950 flex items-center justify-center">
      <div className="container xl:max-w-screen-xl">
        <div className="sm:max-w-sm mx-auto flex justify-center items-center">
          <div>
            <h1 className="my-4 dark:text-whitesmoke text-center text-sm font-semibold sm:text-xl">
              مشکلی در نمایش اطلاعات به وجود آمده است
            </h1>
            <p className="mb-4 dark:text-whitesmoke text-center text-xs font-semibold sm:text-lg flex items-center gap-x-4">
              <span> لطفا از اتصال اینترنت اطمینان حاصل نمایید</span>
              <div className="flex flex-wrap items-center">
                <Spinner
                  size="sm"
                  aria-label="Info spinner example"
                  className=""
                  light
                />
              </div>
            </p>
            <button
              className="flex items-center gap-x-4 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-600 transition-colors mx-auto cursor-pointer"
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
