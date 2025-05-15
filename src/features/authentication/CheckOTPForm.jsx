import { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi";
import { CiEdit } from "react-icons/ci";
import { useToast } from "../../context/useToastContext";

const RESEND_TIME = 90;

function CheckOTPForm({ phone, onBack, onResendOTP, otpResponse = "123456" }) {
  const [otp, setOtp] = useState("");
  const [time, setTime] = useState(RESEND_TIME);

  const navigate = useNavigate();
  const { showToast } = useToast();

  useEffect(() => {
    const timer = time > 0 && setInterval(() => setTime((t) => t - 1), 1000);
    return () => timer && clearInterval(timer);
  }, [time]);

  const checkOtpHandler = (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      showToast("error", "کد تایید باید ۶ رقمی باشد");
      return;
    }

    // 👇 simulate or integrate actual OTP verification here
    if (otp === otpResponse) {
      showToast("success", "کد تایید صحیح است");
      navigate("/home"); // or next step
    } else {
      showToast("error", "کد تایید اشتباه است");
    }
  };

  return (
    <div>
      {/* Back icon */}
      <button onClick={onBack}>
        <HiArrowRight className="w-6 h-6 text-secondary-500" />
      </button>

      {/* Phone message + edit */}
      {otpResponse && (
        <p className="flex items-center gap-x-2 my-2">
          <span>{otpResponse?.message}</span>
          <button onClick={onBack}>
            <CiEdit className="w-6 h-6 text-primary-900" />
          </button>
        </p>
      )}

      {/* Resend countdown */}
      <div className="mb-4 text-secondary-500 text-sm">
        {time > 0 ? (
          <p>{time} ثانیه تا ارسال مجدد کد</p>
        ) : (
          <button
            className="btn w-36 mt-4 justify-center items-center"
            onClick={() => {
              onResendOTP({ phone: phone });
              setTime(RESEND_TIME); // reset timer
            }}
          >
            ارسال مجدد کد تایید
          </button>
        )}
      </div>

      {/* OTP Form */}
      <form className="space-y-6" onSubmit={checkOtpHandler}>
        <p className="text-xs mb-4">کد تایید را وارد کنید:</p>

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
          >
            مرحله بعد
          </button>
        </div>
      </form>
    </div>
  );
}

export default CheckOTPForm;
