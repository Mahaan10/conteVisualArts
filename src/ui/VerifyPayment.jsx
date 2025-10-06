import { useSearchParams } from "react-router-dom";
import usePaymentResponse from "../hooks/useResponsePayment";
import { useEffect } from "react";
import toast from "react-hot-toast";
import Loading from "./Loading";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";

function PaymentVerificationPage() {
  const [searchParams] = useSearchParams();
  const authority = searchParams.get("authority");
  const navigate = useNavigate();
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
      } else {
        toast.error(paymentData?.message || "پرداخت ناموفق بود.");
      }
    }

    if (isError) {
      toast.error(
        error?.response?.data?.message || "خطا در بررسی وضعیت پرداخت."
      );
    }
  }, [paymentData, isError, error]);

  if (!authority) {
    return <p className="text-center">لینک پرداخت نامعتبر است.</p>;
  }

  if (isVerifying) return <Loading />;

  return (
    <div className="h-screen bg-whitesmoke dark:bg-gray-950 flex items-center justify-center">
      <div className="container xl:max-w-screen-xl">
        <div className="sm:max-w-sm mx-auto flex justify-center items-center">
          <div>
            <h1 className="my-4 dark:text-whitesmoke text-center text-sm font-semibold sm:text-xl">
              {paymentData?.success
                ? "پرداخت شما موفقیت‌آمیز بود! 🎉"
                : "متاسفانه پرداخت شما ناموفق بود. ☹"}
            </h1>
            <div className="mb-4 dark:text-whitesmoke text-center text-xs font-semibold sm:text-lg flex items-center gap-x-2">
              <span>
                {paymentData?.success
                  ? `کد پیگیری: **${paymentData?.refId}**`
                  : "لطفا دوباره تلاش کنید"}
              </span>
            </div>
            <div className="flex items-center justify-center gap-x-4">
              <Button
                className="cursor-pointer flex items-center font-semibold mx-auto"
                color="dark"
                onClick={() => navigate("/student/courses")}
              >
                دوره های شما
              </Button>
              <Button
                className="cursor-pointer flex items-center font-semibold mx-auto"
                color="dark"
                onClick={() => navigate("/")}
              >
                صفحه اصلی
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentVerificationPage;
