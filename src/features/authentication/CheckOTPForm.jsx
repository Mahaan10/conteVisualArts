import { useEffect, useState } from "react";

function CheckOTPForm({ phoneNumber, onBack, onResendOTP, otpResponse }) {
  const [otp, setOtp] = useState("");
  const [time, setTime] = useState(RESEND_TIME);

  const { isPending, mutateAsync } = useMutation({
    mutationFn: checkOtp,
  });
  const navigate = useNavigate();

  const checkOtpHandler = async (e) => {
    e.preventDefault();
    try {
      const { user, message } = await mutateAsync({ phoneNumber, otp });
      toast.success(message);

      if (!user.isActive) return navigate("/complete-profile");
      if (user.status !== 2) {
        toast("پروفایل شما در انتظار تایید است!", { icon: "👏" });
        navigate("/");
      }
      if (user.role === "OWNER") return navigate("/owner");
      if (user.role === "FREELANCER") return navigate("/freelancer");
      if (user.role === "ADMIN") return navigate("/admin");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setOtp("");
    }
  };

  useEffect(() => {
    const timer = time > 0 && setInterval(() => setTime((t) => t - 1), 1000);
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [time]);

  return (
    <div className="">
      <button onClick={onBack}>
        <HiArrowRight className="w-6 h-6 text-secondary-500" />
      </button>
      <button>
        {otpResponse && (
          <p className="flex items-center gap-x-2 my-2">
            <span>{otpResponse?.message}</span>
            <button onClick={onBack}>
              <CiEdit className="w-6 h-6 text-primary-900" />
            </button>
          </p>
        )}
      </button>
      <div className="mb-4 text-secondary-500">
        {time > 0 ? (
          <p>{time}ثانیه تا ارسال مجدد کد</p>
        ) : (
          <button className="btn btn--primary w-full" onClick={onResendOTP}>
            ارسال مجدد کد تایید
          </button>
        )}
      </div>
      <form action="" className="space-y-6" onSubmit={checkOtpHandler}>
        <p className="font-bold text-secondary-800">کد تایید را وارد کنید :</p>
        <OTPInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderSeparator={<span>-</span>}
          renderInput={(props) => <input type="number" {...props} />}
          containerStyle="flex flex-row-reverse gap-x-2 justify-center"
          inputStyle={{
            width: "2.5rem",
            padding: "0.5rem 0.2rem",
            border: "1px solid rgb(var(--color-primary-400))",
            borderRadius: "0.5rem",
          }}
        />
        <div className="">
          {isPending ? (
            <Loading />
          ) : (
            <button type="submit" className="btn btn--primary w-full">
              تایید
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default CheckOTPForm;
