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
        <p className="text-xs mb-4">
          لطفاً شماره همراه یا ایمیل خود را وارد کنید:
        </p>
        <ThemeProvider theme={customTheme}>
          <FloatingLabel
            variant="outlined"
            label="شماره همراه یا ایمیل"
            sizing="sm"
            type="text"
            {...register("contact", {
              required: "وارد کردن شماره موبایل یا ایمیل الزامیست",
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
          <p className="text-red-500 text-xs mt-1">{errors.contact.message}</p>
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
