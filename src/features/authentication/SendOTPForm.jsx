import { createTheme, FloatingLabel, ThemeProvider } from "flowbite-react";

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

function SendOTPForm({ onSubmit, isPending, register, isValid, errors }) {
  return (
    <>
      <form action="" className="space-y-5" onSubmit={onSubmit}>
        <p className="text-xs mb-4">شماره همراه خود را وارد کنید:</p>
        <ThemeProvider theme={customTheme}>
          <FloatingLabel
            variant="outlined"
            label="شماره همراه"
            sizing="sm"
            type="tel"
            {...register("phone", {
              required: "وارد کردن شماره موبایل الزامی است",
              pattern: {
                value: /^09\d{9}$/,
                message: "شماره موبایل معتبر نیست",
              },
            })}
          />
        </ThemeProvider>
        {errors.phone && (
          <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
        )}
        <button
          className="btn mt-4 justify-center items-center"
          type="submit"
          disabled={!isValid || isPending}
        >
          مرحله بعد
        </button>
      </form>
    </>
  );
}

export default SendOTPForm;
