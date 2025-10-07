import { Button, Spinner } from "flowbite-react";
import { PiSmileySadFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-whitesmoke dark:bg-gray-950 flex items-center justify-center font-iran-marker">
      <div className="container xl:max-w-screen-xl">
        <div className="sm:max-w-md mx-auto flex justify-center items-center">
          <div>
            <h1 className="my-4 dark:text-whitesmoke text-center text-sm font-semibold sm:text-xl">
              مشکلی در نمایش اطلاعات به وجود آمده است
            </h1>
            <div className="mb-4 dark:text-whitesmoke text-center text-xs font-semibold sm:text-lg flex items-center gap-x-2">
              <span> لطفا از اتصال اینترنت خود اطمینان حاصل نمایید</span>
              <div className="flex flex-wrap items-center">
                <PiSmileySadFill className="w-5 h-5" />
              </div>
            </div>
            <Button
              className="cursor-pointer flex items-center gap-x-4 font-semibold mx-auto"
              color="dark"
              onClick={() => navigate("/")}
            >
              <span>تلاش مجدد</span>
              <Spinner
                size="sm"
                aria-label="Info spinner example"
                color="gray"
              />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
