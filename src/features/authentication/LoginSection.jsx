import { useState, useEffect } from "react";
import { Loader } from "../../ui/Loading";
import { createTheme, FloatingLabel, ThemeProvider } from "flowbite-react";
import OTPInput from "react-otp-input";
import { useToast } from "../../context/useToastContext";
import { CiEdit } from "react-icons/ci";

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
}) {
  const { showToast } = useToast();
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [otp, setOtp] = useState("");
  const [resendTime, setResendTime] = useState(RESEND_TIME);

  useEffect(() => {
    if (contactSubmitted && resendTime > 0) {
      const timer = setInterval(() => setResendTime((t) => t - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [contactSubmitted, resendTime]);

  const contact = getValues("contact");

  const handleSendOTP = async (data) => {
    try {
      await getLoggedIn({
        phone: data.contact,
        email: data.contact,
      });
      setContactSubmitted(true);
      showToast("success", `کد تایید به ${data.contact} ارسال شد`);
    } catch (error) {
      showToast(
        "error",
        error?.response?.data?.message || "ارسال کد ناموفق بود"
      );
    }
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      showToast("error", "کد تایید باید ۶ رقمی باشد");
      return;
    }

    const data = contact.includes("@")
      ? { email: contact, otp }
      : { phone: contact, otp };

    try {
      await getLoggedIn(data);
      onClose();
    } catch (error) {
      const status = error?.response?.status;
      if (status === 404 || status === 409) {
        showToast("info", "لطفاً اطلاعات خود را تکمیل کنید");
        onLoginSuccess(contact, otp);
      } else if (status === 401 || status === 400) {
        showToast(
          "error",
          error?.response?.data?.message || "کد تایید اشتباه است"
        );
      } else {
        showToast(
          "error",
          error?.response?.data?.message || "ورود با خطا مواجه شد"
        );
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
              type="text"
              {...register("contact", {
                required: "وارد کردن شماره همراه الزامیست",
                validate: (value) => {
                  const isPhone = /^09\d{9}$/.test(value);
                  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                  return (
                    isPhone || isEmail || "فرمت شماره موبایل یا ایمیل صحیح نیست"
                  );
                },
              })}
            />
          </ThemeProvider>
          {errors.contact && (
            <p className="text-red-500 text-xs mt-1">
              {errors.contact.message}
            </p>
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
            <p className="text-xs mb-4 flex items-center justify-center">
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
