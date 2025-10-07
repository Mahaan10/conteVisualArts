import { createTheme, FloatingLabel, ThemeProvider } from "flowbite-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Loader } from "../../ui/Loading";
import useSignUp from "../../hooks/useSignUp";

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

function CompleteProfile({ contact, onClose }) {
  const { createNewUser, isCreatingUser } = useSignUp();

  const schema = yup.object().shape({
    name: yup.string().required("نام و نام خانوادگی الزامیست"),
    email: yup
      .string()
      .required("ایمیل الزامیست")
      .email("فرمت ایمیل معتبر نیست"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const newUser = {
      name: data?.name,
      phone: contact,
      email: data?.email,
    };
    await createNewUser(newUser);
    onClose();
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <p className="text-xs mb-4">لطفاً اطلاعات زیر را تکمیل کنید:</p>
      <ThemeProvider theme={customTheme}>
        {/* Full name input */}
        <FloatingLabel
          variant="outlined"
          label="نام و نام خانوادگی"
          sizing="sm"
          type="text"
          {...register("name")}
        />
        {errors.name && (
          <p className="text-red-500 text-xs">{errors.name.message}</p>
        )}

        <FloatingLabel
          variant="outlined"
          label="ایمیل"
          sizing="sm"
          type="email"
          {...register("email")}
        />
        {errors?.email && (
          <p className="text-red-500 text-xs">{errors?.email?.message}</p>
        )}
      </ThemeProvider>

      <button
        className="btn mt-4 justify-center items-center"
        type="submit"
        disabled={!isValid || isCreatingUser}
      >
        {isCreatingUser ? <Loader /> : "تایید"}
      </button>
    </form>
  );
}

export default CompleteProfile;
