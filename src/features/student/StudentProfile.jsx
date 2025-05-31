import { useForm } from "react-hook-form";
import { useGetUser } from "../../context/useGetUserContext";
import { useToast } from "../../context/useToastContext";
import Loading from "../../ui/Loading";
import {
  Button,
  createTheme,
  FileInput,
  FloatingLabel,
  ThemeProvider,
} from "flowbite-react";
import { CiEdit } from "react-icons/ci";
import { useState } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";

const customTheme = createTheme({
  floatingLabel: {
    label: {
      default: {
        outlined: {
          sm: "right-1 left-auto dark:bg-gray-950 bg-whitesmoke cursor-text",
        },
      },
    },
    input: {
      default: {
        outlined: {
          sm: "min-w-3xs max-w-2xs",
        },
      },
    },
  },
  fileInput: {
    sizes: {
      sm: "max-w-2xs min-w-3xs bg-inherit dark:bg-inherit",
    },
  },
});

function StudentProfile() {
  const { user, isLoading, isError, error, token } = useGetUser();
  const { showToast } = useToast();
  const [isNameEditable, setIsNameEditable] = useState(false);
  const [isPhoneEditable, setIsPhoneEditable] = useState(false);
  const [isEmailEditable, setIsEmailEditable] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      name: user?.name,
      phone: user?.phone,
      email: user?.email,
    },
  });

  // هوک‌های useOutsideClick برای هر بخش
  const nameRef = useOutsideClick(() => setIsNameEditable(false));
  const phoneRef = useOutsideClick(() => setIsPhoneEditable(false));
  const emailRef = useOutsideClick(() => setIsEmailEditable(false));

  if (isError || !token)
    return showToast(
      "error",
      error?.response?.data?.message || "اطلاعات کاربری یافت نشد"
    );

  if (isLoading) return <Loading />;

  return (
    <div className="container">
      <h1 className="text-xl font-bold">اطلاعات کاربری</h1>
      <div className="w-full h-[0.5px] my-10 bg-light-shade-yellow dark:bg-dark-purple transition-colors duration-300"></div>
      <form>
        <ThemeProvider theme={customTheme}>
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-6 flex-col sm:flex-row">
              {/* نام */}
              <div className="flex relative" ref={nameRef}>
                <FloatingLabel
                  variant="outlined"
                  label="نام و نام خانوادگی"
                  sizing="sm"
                  type="text"
                  disabled={!isNameEditable}
                  className={`transition-all duration-300 ${
                    isNameEditable && "shadow-md bg-gray-200 dark:bg-gray-600"
                  }`}
                  {...register("name", {
                    required: "وارد کردن نام و نام خانوادگی الزامیست",
                    validate: (value) => value || "فرمت نام صحیح نیست",
                  })}
                />
                <button
                  type="button"
                  className="absolute left-2 top-1/3 cursor-pointer"
                  onClick={() => setIsNameEditable(true)}
                >
                  <CiEdit className="w-4 h-4" />
                </button>
              </div>

              {/* تلفن */}
              <div className="flex relative" ref={phoneRef}>
                <FloatingLabel
                  variant="outlined"
                  label="شماره همراه"
                  sizing="sm"
                  type="text"
                  disabled={!isPhoneEditable}
                  className={`transition-all duration-300 ${
                    isPhoneEditable && "shadow-md bg-gray-200 dark:bg-gray-600"
                  }`}
                  {...register("phone", {
                    required: "وارد کردن شماره همراه الزامیست",
                    validate: (value) =>
                      /^09\d{9}$/.test(value) || "فرمت شماره موبایل صحیح نیست",
                  })}
                />
                <button
                  type="button"
                  className="absolute left-2 top-1/3 cursor-pointer"
                  onClick={() => setIsPhoneEditable(true)}
                >
                  <CiEdit className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-6 flex-col sm:flex-row">
              {/* ایمیل */}
              <div className="flex relative" ref={emailRef}>
                <FloatingLabel
                  variant="outlined"
                  label="ایمیل"
                  sizing="sm"
                  type="text"
                  disabled={!isEmailEditable}
                  className={`transition-all duration-300 ${
                    isEmailEditable && "shadow-md bg-gray-200 dark:bg-gray-600"
                  }`}
                  {...register("email", {
                    required: "وارد کردن ایمیل الزامیست",
                    validate: (value) =>
                      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
                      "فرمت ایمیل صحیح نیست",
                  })}
                />
                <button
                  type="button"
                  className="absolute left-2 top-1/3 cursor-pointer"
                  onClick={() => setIsEmailEditable(true)}
                >
                  <CiEdit className="w-4 h-4" />
                </button>
              </div>

              <div id="fileUpload">
                <FileInput sizing="sm" />
              </div>
            </div>
          </div>
          <Button color="dark" outline className="mt-4">
            تایید
          </Button>
        </ThemeProvider>
      </form>
    </div>
  );
}

export default StudentProfile;
