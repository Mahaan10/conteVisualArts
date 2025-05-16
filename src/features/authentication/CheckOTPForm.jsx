import { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
//import { useNavigate } from "react-router-dom";
import { useToast } from "../../context/useToastContext";
import useUsers from "../../hooks/useUsers";
import useAuth from "../../hooks/useAuth";

const RESEND_TIME = 90;

function CheckOTPForm({
  setStep,
  isValid,
  contact,
  onBack,
  onClose,
  onResendOTP,
  otpResponse = "123456",
}) {
  const { error, isError, isLoading, users } = useUsers();
  const { getLoggedIn, isLoggedIn } = useAuth();
  const [otp, setOtp] = useState("");
  const [time, setTime] = useState(RESEND_TIME);
  //const navigate = useNavigate();
  const { showToast } = useToast();

  useEffect(() => {
    const timer = time > 0 && setInterval(() => setTime((t) => t - 1), 1000);
    return () => timer && clearInterval(timer);
  }, [time]);

  if (isError)
    return showToast(error?.response?.data?.message || error?.message);

  const checkOtpHandler = (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      showToast("error", "کد تایید باید ۶ رقمی باشد");
      return;
    }

    if (otp === otpResponse) {
      const isExistingUser = users.some(
        (user) => user.phone === contact || user.email === contact
      );

      showToast("success", "کد تایید صحیح است");

      if (isExistingUser) {
        onClose();
        getLoggedIn();
      } else {
        setStep(3);
      }
    } else {
      showToast("error", "کد تایید اشتباه است");
    }
  };

  return (
    <>
      {/* Resend countdown */}
      <div className="mb-4 text-secondary-500 text-sm">
        {time > 0 ? (
          <p>{time} ثانیه تا ارسال مجدد کد</p>
        ) : (
          <button
            className="btn w-36 mt-4 justify-center items-center"
            onClick={async () => {
              try {
                await onResendOTP({ phone: contact });
                showToast("success", `کد تایید مجدد به ${contact} ارسال شد`);
                setTime(RESEND_TIME);
              } catch (error) {
                showToast(
                  "error",
                  error?.response?.data?.message ||
                    "ارسال مجدد کد با خطا مواجه شد"
                );
              }
            }}
          >
            ارسال مجدد کد تایید
          </button>
        )}
      </div>

      {/* OTP Form */}
      <form className="space-y-6" onSubmit={checkOtpHandler}>
        <p className="text-xs mb-4">کد تایید را وارد کنید:</p>
        {/* Get The OTPINPUT responsive!!!!!! */}
        <OTPInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderSeparator={<span>-</span>}
          renderInput={(props) => <input type="number" {...props} />}
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
            disabled={!isValid /* || isPending */ || isLoggedIn}
          >
            مرحله بعد
          </button>
        </div>
      </form>
    </>
  );
}

export default CheckOTPForm;
