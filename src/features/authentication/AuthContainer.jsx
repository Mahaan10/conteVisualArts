import { useState } from "react";
import { useToast } from "../../context/useToastContext";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import LoginSection from "./LoginSection";
import CompleteProfile from "./CompleteProfile";

function AuthContainer({ onClose }) {
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const { showToast } = useToast();
  const { getLoggedIn, isLoggedInLoading } = useAuth();
  const [contact, setContact] = useState("");

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors, isValid },
  } = useForm({ mode: "onBlur" });

  const handleLoginSuccess = (contact, otp) => {
    setContact(contact);
    setOtp(otp);
    setStep(2);
  };

  return (
    <>
      <div className="flex items-center justify-center mb-6">
        <div className={`step-circle ${step === 1 && "opacity-100"}`}>1</div>
        <div className="flex-1 h-0.5 bg-gray-400 my-2 rounded-xs" />
        <div className={`step-circle ${step === 2 && "opacity-100"}`}>2</div>
      </div>
      {step === 1 && (
        <LoginSection
          register={register}
          handleSubmit={handleSubmit}
          getValues={getValues}
          isValid={isValid}
          errors={errors}
          isLoggedInLoading={isLoggedInLoading}
          onClose={onClose}
          getLoggedIn={getLoggedIn}
          showToast={showToast}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
      {step === 2 && <CompleteProfile contact={contact} otp={otp} />}
    </>
  );
}

export default AuthContainer;
