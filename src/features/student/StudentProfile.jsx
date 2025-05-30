import { useForm } from "react-hook-form";
import { useGetUser } from "../../context/useGetUserContext";
import { useToast } from "../../context/useToastContext";
import Loading from "../../ui/Loading";
import {
  createTheme,
  FileInput,
  FloatingLabel,
  ThemeProvider,
} from "flowbite-react";
import { CiEdit } from "react-icons/ci";
import { useState } from "react";

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
    getValues,
    formState: { errors, isValid },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      name: user?.name,
      phone: user?.phone,
      email: user?.email,
    },
  });

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
      <form action="">
        <ThemeProvider theme={customTheme}>
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-6 flex-col sm:flex-row">
              <div className="flex relative">
                <FloatingLabel
                  variant="outlined"
                  label="نام و نام خانوادگی"
                  sizing="sm"
                  type="text"
                  disabled={!isNameEditable}
                  {...register("name", {
                    required: "وارد کردن نام و نام خانوادگی الزامیست",
                    validate: (value) => {
                      const name = String(value);
                      return name || "فرمت شماره نام و نام خانوادگی صحیح نیست";
                    },
                  })}
                />
                <button
                  type="button"
                  className="absolute left-2 top-1/3 cursor-pointer"
                  onClick={() => setIsNameEditable(!isNameEditable)}
                >
                  <CiEdit className="w-4 h-4" />
                </button>
              </div>
              <div className="flex relative">
                <FloatingLabel
                  variant="outlined"
                  label="شماره همراه"
                  sizing="sm"
                  type="text"
                  disabled={!isPhoneEditable}
                  {...register("phone", {
                    required: "وارد کردن شماره همراه الزامیست",
                    validate: (value) => {
                      const isPhone = /^09\d{9}$/.test(value);
                      return isPhone || "فرمت شماره موبایل صحیح نیست";
                    },
                  })}
                />
                <button
                  type="button"
                  className="absolute left-2 top-1/3 cursor-pointer"
                  onClick={() => setIsPhoneEditable(!isPhoneEditable)}
                >
                  <CiEdit className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex items-center gap-6 flex-col sm:flex-row">
              <div className="flex relative">
                <FloatingLabel
                  variant="outlined"
                  label="ایمیل"
                  sizing="sm"
                  type="text"
                  disabled={!isEmailEditable}
                  {...register("email", {
                    required: "وارد کردن ایمیل الزامیست",
                    validate: (value) => {
                      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                      return isEmail || "فرمت ایمیل صحیح نیست";
                    },
                  })}
                />
                <button
                  type="button"
                  className="absolute left-2 top-1/3 cursor-pointer"
                >
                  <CiEdit
                    className="w-4 h-4"
                    onClick={() => setIsEmailEditable(!isEmailEditable)}
                  />
                </button>
              </div>
              <div id="fileUpload">
                <FileInput sizing="sm" />
              </div>
            </div>
          </div>
        </ThemeProvider>
      </form>
    </div>
  );
}

export default StudentProfile;

function formattedDate(isoString) {
  return new Date(isoString).toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}
