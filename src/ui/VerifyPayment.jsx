import { Link, useSearchParams } from "react-router-dom";
import usePaymentResponse from "../hooks/useResponsePayment";
import { useEffect } from "react";
import toast from "react-hot-toast";
import Loading from "./Loading";
import { PiSmileySadFill } from "react-icons/pi";
import { GiPartyPopper } from "react-icons/gi";

function PaymentVerificationPage() {
  const [searchParams] = useSearchParams();
  const authority = searchParams.get("authority");
  const {
    paymentData,
    isLoading: isVerifying,
    isError,
    error,
  } = usePaymentResponse(authority);

  useEffect(() => {
    if (paymentData) {
      if (paymentData?.success) {
        toast.success(
          `پرداخت با موفقیت انجام شد. کد پیگیری: ${paymentData?.refId}`
        );
      } else if (!paymentData.success) {
        toast.error("پرداخت ناموفق بود.");
      }
    }

    if (isError) {
      toast.error(
        error?.response?.data?.message || "خطا در بررسی وضعیت پرداخت."
      );
    }
  }, [paymentData, isError, error]);

  if (isVerifying) return <Loading />;

  return (
    <div className="h-screen bg-whitesmoke dark:bg-gray-950 flex items-center justify-center font-iran-marker">
      <div className="container xl:max-w-screen-xl">
        <div className="sm:max-w-sm mx-auto flex justify-center items-center dark:text-whitesmoke">
          <div>
            <h1 className="my-4 text-center text-sm font-semibold sm:text-xl flex items-center gap-x-2">
              {paymentData?.success ? (
                <>
                  پرداخت شما موفقیت‌آمیز بود!
                  <div className="flex flex-wrap items-center">
                    <GiPartyPopper className="w-5 h-5" />
                  </div>
                </>
              ) : (
                <>
                  متاسفانه پرداخت شما ناموفق بود.
                  <div className="flex flex-wrap items-center">
                    <PiSmileySadFill className="w-5 h-5" />
                  </div>
                </>
              )}
            </h1>
            <div className="mb-4 text-center text-sm font-semibold sm:text-xl flex items-center gap-x-2">
              <span>
                {paymentData?.success
                  ? `کد پیگیری: ${paymentData?.refId}`
                  : "لطفا دوباره تلاش کنید."}
              </span>
            </div>
            <div className="flex items-center justify-center gap-x-4 mt-8">
              <Link
                to="/student/courses"
                className="p-2 rounded-lg bg-almond-cookie dark:hover:bg-dark-cerulean dark:text-whitesmoke hover:bg-golden-sand dark:bg-purple-plumeria transition-colors duration-300 cursor-pointer btn w-full justify-center mx-auto"
              >
                دوره های من
              </Link>
              <Link
                to="/"
                className="p-2 rounded-lg bg-almond-cookie dark:hover:bg-dark-cerulean hover:bg-golden-sand dark:bg-purple-plumeria transition-colors duration-300 cursor-pointer btn w-full justify-center mx-auto"
              >
                صفحه اصلی
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentVerificationPage;
