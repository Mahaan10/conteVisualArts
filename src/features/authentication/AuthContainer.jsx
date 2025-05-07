import { FloatingLabel } from "flowbite-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toPersianNumbers } from "../../utils/toPersianNumbers";
import SendOTPForm from "./SendOTPForm";

function AuthContainer() {
  const [step, setStep] = useState(1);
  const { handleSubmit, register, getValues } = useForm();
  const { user } = useUser();
  const navigate = useNavigate();

  const {
    isPending,
    mutateAsync,
    data: otpResponse,
  } = useMutation({
    mutationFn: getOtp,
  });

  useEffect(() => {
    if (user) navigate("/", { replace: true });
  }, [user, navigate]);

  const sendOtpHandler = async (data) => {
    try {
      const { message } = await mutateAsync(data);
      toast.success(message);
      setStep(2);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <SendOTPForm
            setStep={setStep}
            register={register}
            isPending={isPending}
            onSubmit={handleSubmit(sendOtpHandler)}
          />
        );
      case 2:
        return (
          <CheckOTPForm
            phoneNumber={getValues("phoneNumber")}
            onBack={() => setStep((s) => s - 1)}
            onResendOTP={sendOtpHandler}
            otpResponse={otpResponse}
          />
        );
      default:
        return null;
    }
  };

  return <div className="w-full sm:max-w-sm">{renderStep()}</div>;
}

export default AuthContainer;
