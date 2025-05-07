import { FloatingLabel } from "flowbite-react";
import { useState } from "react";

function MultiStepForm() {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <form className="">
      <div className="flex items-center justify-center mb-8">
        <div
          className={`step-circle ${
            step === 1 && "border-red-700 text-cyan-500"
          }`}
        >
          1
        </div>
        <div className="step-line" />
        <div
          className={`step-circle ${
            step === 2 && "border-red-700 text-cyan-500"
          }`}
        >
          2
        </div>
        <div className="step-line" />
        <div
          className={`step-circle ${
            step === 3 && "border-red-700 text-cyan-500"
          }`}
        >
          3
        </div>
      </div>
      <div className="mb-7">
        {step === 1 && (
          <>
            <p className="text-xs mb-8">شماره همراه خود را وارد کنید:</p>
            <FloatingLabel
              variant="outlined"
              label="شماره همراه"
            ></FloatingLabel>
          </>
        )}
        {step === 2 && (
          <>
            <p className="text-xs mb-8">ایمیل خود را وارد کنید.</p>
            <FloatingLabel
              variant="outlined"
              label="شماره همراه"
            ></FloatingLabel>
          </>
        )}
        {step === 3 && <p className="text-xs">آماده ارسال!</p>}
      </div>
      <div className="button-container stepper-btns">
        {step < 3 && (
          <button onClick={nextStep} className="stepper-btn next">
            بعدی
          </button>
        )}
        {step > 1 && (
          <button onClick={prevStep} className="stepper-btn prev">
            قبلی
          </button>
        )}
        {step === 3 && <button className="stepper-btn submit">ارسال</button>}
      </div>
    </form>
  );
}

export default MultiStepForm;
