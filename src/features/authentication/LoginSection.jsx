import { useState, useEffect, useCallback } from "react";
import { Loader } from "../../ui/Loading";
import { createTheme, FloatingLabel, ThemeProvider } from "flowbite-react";
import OTPInput from "react-otp-input";
import { CiEdit } from "react-icons/ci";
import toast from "react-hot-toast";

const RESEND_TIME = 60;
const customTheme = createTheme({
  floatingLabel: {
    label: {
      default: {
        outlined: {
          sm: "right-1 left-auto dark:bg-gray-950 bg-whitesmoke cursor-text",
        },
      },
    },
  },
});

function LoginSection({
  register,
  handleSubmit,
  getValues,
  isValid,
  errors,
  isLoggedInLoading,
  onClose,
  getLoggedIn,
  onLoginSuccess,
  setOtp,
  otp,
}) {
  const [contactSubmitted, setContactSubmitted] = useState(false);
  //const [otp, setOtp] = useState("");
  const [isAutoSubmitted, setIsAutoSubmitted] = useState(false);
  const [resendTime, setResendTime] = useState(RESEND_TIME);
  const phone = getValues("phone");

  const handleVerifyOTP = useCallback(async () => {
    if (otp.length !== 6) {
      toast.error("کد تایید باید ۶ رقمی باشد");
      return;
    }

    const data = { phone, otp };

    try {
      await getLoggedIn(data);
      onClose();
    } catch (error) {
      const status = error?.response?.status;

      /* if (status === 404 || status === 409) {
        toast.success("لطفاً اطلاعات خود را تکمیل کنید");
        onLoginSuccess(contact, "");
      } else */ if (status === 401 || status === 400) {
        toast.error(error?.response?.data?.message || "کد تایید اشتباه است");
      } else {
        toast.error(error?.response?.data?.message || "ورود با خطا مواجه شد");
      }
      if (isAutoSubmitted) {
        setIsAutoSubmitted(false);
      }
    }
  }, [otp, phone, getLoggedIn, onClose, isAutoSubmitted]);

  useEffect(() => {
    if (contactSubmitted && resendTime > 0) {
      const timer = setInterval(() => setResendTime((t) => t - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [contactSubmitted, resendTime]);

  useEffect(() => {
    if (
      contactSubmitted &&
      otp.length === 6 &&
      !isLoggedInLoading &&
      !isAutoSubmitted
    ) {
      setIsAutoSubmitted(true);
      handleVerifyOTP();
    }
  }, [
    otp,
    contactSubmitted,
    isLoggedInLoading,
    handleVerifyOTP,
    isAutoSubmitted,
  ]);

  const handleSendOTP = async ({ phone }) => {
    try {
      await getLoggedIn({ phone });
      setContactSubmitted(true);
      setResendTime(RESEND_TIME);
      toast.success(`کد تایید به ${phone} ارسال شد`);
    } catch (error) {
      const status = error?.response?.status;

      if (status === 404 || status === 409) {
        toast.success("لطفا اطلاعات خود را تکمیل کنید");
        onLoginSuccess(phone);
      } else {
        toast.error(error?.response?.data?.message || "ارسال کد ناموفق بود");
      }
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit(handleSendOTP)}>
      {!contactSubmitted && (
        <>
          <p className="text-xs mb-4">لطفاً شماره همراه خود را وارد کنید:</p>
          <ThemeProvider theme={customTheme}>
            <FloatingLabel
              variant="outlined"
              label="شماره همراه"
              sizing="sm"
              type="tel"
              {...register("phone", {
                required: "وارد کردن شماره همراه الزامیست",
                validata: (value) => {
                  const isPhone = /^09\d{9}$/.test(value);
                  return isPhone || "فرمت شماره همراه صحیح نیست";
                },
              })}
            />
          </ThemeProvider>
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
          )}
          <button
            className="btn mt-4"
            type="submit"
            disabled={!isValid || isLoggedInLoading}
          >
            {isLoggedInLoading ? <Loader /> : "ارسال کد تایید"}
          </button>
        </>
      )}

      {contactSubmitted && (
        <>
          <div className="flex items-center justify-between">
            <p className="text-xs flex items-center justify-center">
              کد تایید را وارد کنید:
            </p>
            <button
              className="btn flex items-center justify-center gap-x-6"
              onClick={() => {
                setContactSubmitted(false);
                setOtp("");
              }}
            >
              ویرایش
              <CiEdit className="w-5 h-5" />
            </button>
          </div>
          <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span></span>}
            renderInput={(props) => (
              <input
                inputMode="numeric"
                type="tel"
                {...props}
                autoComplete="one-time-code"
              />
            )}
            containerStyle="flex flex-row-reverse gap-x-2 justify-center my-5 w-full"
            inputStyle={{
              width: "14%",
              maxWidth: "3rem",
              padding: "0.5rem 0.2rem",
              border: "1px solid gray",
              borderRadius: "0.5rem",
            }}
          />
          {resendTime > 0 ? (
            <p className="text-sm">{resendTime} ثانیه تا ارسال مجدد</p>
          ) : (
            <button
              className="btn mt-2"
              onClick={() => {
                handleSendOTP({ contact: getValues("contact") });
                setResendTime(RESEND_TIME);
              }}
              type="button"
            >
              {isLoggedInLoading ? <Loader /> : "ارسال مجدد کد"}
            </button>
          )}
          <button
            className="btn mt-4"
            type="button"
            onClick={handleVerifyOTP}
            disabled={isLoggedInLoading}
          >
            {isLoggedInLoading ? <Loader /> : "تایید کد"}
          </button>
        </>
      )}
    </form>
  );
}

export default LoginSection;
