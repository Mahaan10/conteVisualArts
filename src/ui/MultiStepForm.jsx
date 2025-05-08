import { createTheme, FloatingLabel, ThemeProvider } from "flowbite-react";
import { useState } from "react";
import OtpInput from "react-otp-input";

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

const MultiStepForm = () => {
  const [step, setStep] = useState(1);

  const nextStep = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };
  const prevStep = (e) => {
    e.preventDefault();
    setStep(step - 1);
  };

  return (
    <form>
      <div className="flex items-center justify-center mb-6">
        <div className={`step-circle ${step === 1 && "opacity-100"}`}>1</div>
        <div className="flex-1 h-0.5 bg-gray-400 my-2 rounded-xs" />
        <div className={`step-circle ${step === 2 && "opacity-100"}`}>2</div>
        <div className="flex-1 h-0.5 bg-gray-400 my-2 rounded-xs" />
        <div className={`step-circle ${step === 3 && "opacity-100"}`}>3</div>
      </div>
      {step === 1 && (
        <>
          <p className="text-xs mb-4">شماره همراه خود را وارد کنید:</p>
          <ThemeProvider theme={customTheme}>
            <FloatingLabel
              variant="outlined"
              label="شماره همراه"
              sizing="sm"
              type="tel"
            />
          </ThemeProvider>
        </>
      )}
      {step === 2 && (
        <>
          <p className="text-xs mb-4">کد تایید را وارد کنید:</p>
          <OtpInput
            value=""
            onChange=""
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
        </>
      )}
      <div className="flex items-center justify-between gap-6">
        {step > 1 && (
          <button
            className="btn mt-4 justify-center items-center"
            onClick={prevStep}
          >
            مرحله قبل
          </button>
        )}
        {step < 3 && (
          <button
            className="btn mt-4 justify-center items-center"
            onClick={nextStep}
          >
            مرحله بعد
          </button>
        )}
        {step === 3 && (
          <button className="btn mt-4 justify-center items-center">
            ثبت نام
          </button>
        )}
      </div>
    </form>
  );
};

export default MultiStepForm;
