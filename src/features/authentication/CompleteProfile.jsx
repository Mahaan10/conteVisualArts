import { createTheme, FloatingLabel, ThemeProvider } from "flowbite-react";
import { useForm } from "react-hook-form";
import useCreateNewUser from "../../hooks/useCreateNewUser";

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

function CompleteProfile({ contact, otp }) {
  const isPhone = /^09\d{9}$/.test(contact);
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact);
  const { createNewUser, isCreatingUser } = useCreateNewUser();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onBlur" });

  const onSubmit = async (data) => {
    const newUser = {
      name: data.name,
      otp: otp,
      ...(isPhone ? { phone: contact } : { email: contact }),
      ...(isPhone && data.email ? { email: data.email } : ""),
      ...(isEmail && data.phone ? { phone: data.phone } : ""),
    };
    console.log(newUser);
    await createNewUser(newUser);
    console.log(newUser);
  };
  return (
    <form action="" className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <p className="text-xs mb-4">لطفاً اطلاعات زیر را تکمیل کنید:</p>
      <ThemeProvider theme={customTheme}>
        {/* Full name input */}
        <FloatingLabel
          variant="outlined"
          label="نام و نام خانوادگی"
          sizing="sm"
          type="text"
          {...register("name", { required: "نام و نام خانوادگی الزامیست" })}
        />
        {errors.name && (
          <p className="text-red-500 text-xs">{errors?.name?.message}</p>
        )}

        {/* Conditionally render phone or email */}
        {isEmail && (
          <>
            <FloatingLabel
              variant="outlined"
              label="شماره همراه"
              sizing="sm"
              type="tel"
              {...register("phone", {
                required: "شماره موبایل الزامیست",
                pattern: {
                  value: /^09\d{9}$/,
                  message: "فرمت شماره همراه صحیح نیست",
                },
              })}
            />
            {errors.name && (
              <p className="text-red-500 text-xs">{errors?.name?.message}</p>
            )}
          </>
        )}
        {isPhone && (
          <>
            <FloatingLabel
              variant="outlined"
              label="ایمیل"
              sizing="sm"
              type="email"
              {...register("email", {
                required: "ایمیل الزامیست",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "فرمت ایمیل معتبر نیست",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors?.email?.message}</p>
            )}
          </>
        )}
      </ThemeProvider>

      <button
        className="btn mt-4 justify-center items-center"
        type="submit"
        disabled={!isValid || isCreatingUser}
      >
        {isCreatingUser ? "..." : "تایید"}
      </button>
    </form>
  );
}

export default CompleteProfile;
