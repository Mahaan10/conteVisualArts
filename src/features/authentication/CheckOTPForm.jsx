import { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { useToast } from "../../context/useToastContext";
import useAuth from "../../hooks/useAuth";
import { Loader } from "../../ui/Loading";

const RESEND_TIME = 90;

function CheckOTPForm({
  isValid,
  contact,
  onBack,
  onClose,
  onResendOTP,
  onOTPVerified,
  isPending,
}) {
  const [otp, setOtp] = useState("");
  const { showToast } = useToast();
  const { getLoggedIn, isLoggedInLoading } = useAuth();

  const [time, setTime] = useState(RESEND_TIME);

  useEffect(() => {
    const timer = time > 0 && setInterval(() => setTime((t) => t - 1), 1000);
    return () => timer && clearInterval(timer);
  }, [time]);

  const onResendOTPHandler = async () => {
    try {
      await onResendOTP({ phone: contact });
      showToast("success", `کد تایید مجدد به ${contact} ارسال شد`);
      setTime(RESEND_TIME);
    } catch (error) {
      showToast(
        "error",
        error?.response?.data?.message || "ارسال مجدد کد با خطا مواجه شد"
      );
    }
  };

  const checkOtpHandler = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      showToast("error", "کد تایید باید ۶ رقمی باشد");
      return;
    }

    const data = contact.includes("@")
      ? { email: contact, otp }
      : { phone: contact, otp };

    try {
      await getLoggedIn(data); // Success = user exists
      onClose(); // Will navigate from inside useAuth
    } catch (error) {
      const status = error?.response?.status;

      if (status === 404 || status === 409) {
        showToast("info", "لطفاً اطلاعات خود را تکمیل کنید");
        onOTPVerified();
      } else if (status === 401) {
        showToast("error", "کد تایید اشتباه است");
      } else {
        showToast(
          "error",
          error?.response?.data?.message || "ورود با خطا مواجه شد"
        );
      }
    }
  };

  return (
    <>
      <div className="mb-4 text-secondary-500 text-sm">
        {time > 0 ? (
          <p>{time} ثانیه تا ارسال مجدد کد</p>
        ) : (
          <button
            className="btn w-36 mt-4 justify-center items-center"
            onClick={onResendOTPHandler}
          >
            {isPending ? <Loader /> : "ارسال مجدد کد تایید"}
          </button>
        )}
      </div>

      <form className="space-y-6" onSubmit={checkOtpHandler}>
        <p className="text-xs mb-4">کد تایید را وارد کنید:</p>

        <OTPInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderSeparator={<span>-</span>}
          renderInput={(props) => (
            <input inputMode="numeric" type="tel" {...props} />
          )}
          containerStyle="flex flex-row-reverse gap-x-2 justify-center my-5"
          inputStyle={{
            width: "2.5rem",
            padding: "0.5rem 0.2rem",
            border: "1px solid gray",
            borderRadius: "0.5rem",
          }}
        />

        <div className="flex items-center justify-between gap-6">
          <button
            className="btn mt-4 justify-center items-center"
            type="button"
            onClick={onBack}
          >
            مرحله قبل
          </button>
          <button
            className="btn mt-4 justify-center items-center"
            type="submit"
            disabled={!isValid}
          >
            {isLoggedInLoading ? <Loader /> : "تایید"}
          </button>
        </div>
      </form>
    </>
  );
}

export default CheckOTPForm;
