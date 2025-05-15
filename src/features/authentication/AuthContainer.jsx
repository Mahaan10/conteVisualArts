//import { useNavigate } from "react-router-dom";
import { FloatingLabel } from "flowbite-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import SendOTPForm from "./SendOTPForm";
//import useUsers from "../../hooks/useUsers";
import CheckOTPForm from "./CheckOTPForm";
import { useToast } from "../../context/useToastContext";
import useSendOTP from "../../hooks/useSendOTP";

function AuthContainer() {
  // const { users, isLoading, isError, error } = useUsers();
  const [step, setStep] = useState(1);
  const { showToast } = useToast();
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors, isValid },
  } = useForm({ mode: "onBlur" });

  //const navigate = useNavigate();

  const { isPending, sendOtpHandler } = useSendOTP();

  const onSubmit = async (data) => {
    await sendOtpHandler(data, {
      onSuccess: () => {
        showToast("success", `کد به شماره همراه ${data.phone} ارسال شد.`);
        setStep(2);
      },
      onError: (error) => {
        showToast(
          "error",
          error?.response?.data?.message || "ارسال کد با خطا مواجه شد"
        );
      },
    });
  };

  const RenderStep = () => {
    switch (step) {
      case 1:
        return (
          <SendOTPForm
            setStep={setStep}
            register={register}
            isPending={isPending}
            onSubmit={handleSubmit(onSubmit)}
            errors={errors}
            isValid={isValid}
          />
        );
      case 2:
        return (
          <CheckOTPForm
            phone={getValues("phone")}
            onResendOTP={sendOtpHandler}
            onBack={() => setStep(1)}
            //otpResponse={otpResponse}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="flex items-center justify-center mb-6">
        <div className={`step-circle ${step === 1 && "opacity-100"}`}>1</div>
        <div className="flex-1 h-0.5 bg-gray-400 my-2 rounded-xs" />
        <div className={`step-circle ${step === 2 && "opacity-100"}`}>2</div>
        <div className="flex-1 h-0.5 bg-gray-400 my-2 rounded-xs" />
        <div className={`step-circle ${step === 3 && "opacity-100"}`}>3</div>
      </div>
      <RenderStep />
    </>
  );
}

export default AuthContainer;
