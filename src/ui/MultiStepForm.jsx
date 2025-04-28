import React, { useState } from "react";
import InputTextField from "./InputTextField";

const MultiStepForm = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [step, setStep] = useState(2);

  const nextStep = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };
  const prevStep = (e) => {
    e.preventDefault();
    setStep(step - 1);
  };

  return (
    <>
      <div className="flex items-center justify-center mb-6">
        <div
          className={`stepperCircle ${
            step === 1 &&
            "!opacity-100 !border-neutral-200 !bg-black !text-neutral-200"
          }`}
        >
          1
        </div>
        <div className="flex-1 h-0.5 bg-gray-400 my-2 rounded-xs" />
        <div
          className={`stepperCircle ${
            step === 2 &&
            "!opacity-100 !border-neutral-200 !bg-black !text-neutral-200"
          }`}
        >
          2
        </div>
        <div className="flex-1 h-0.5 bg-gray-400 my-2 rounded-xs" />
        <div
          className={`stepperCircle ${
            step === 3 &&
            "!opacity-100 !border-neutral-200 !bg-black !text-neutral-200"
          }`}
        >
          3
        </div>
      </div>
      <form>
        {step === 1 && (
          <InputTextField
            title="شماره همراه"
            type="tel"
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
          />
        )}
        {step === 2 && (
          <>
            <InputTextField title="ایمیل" />
            <InputTextField title="ایمیل" />
          </>
        )}
        <div className="flex items-center justify-between gap-6">
          {step > 1 && (
            <button
              className="btn !bg-blue-700 text-base font-bold hover:!bg-blue-800"
              onClick={prevStep}
            >
              قبلی
            </button>
          )}
          {step < 3 && (
            <button
              className="btn !bg-blue-700 text-base font-bold hover:!bg-blue-800"
              onClick={nextStep}
            >
              بعدی
            </button>
          )}
          {step === 3 && (
            <button className="btn !bg-blue-700 text-base font-bold hover:!bg-blue-800">
              ثبت نام
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default MultiStepForm;
