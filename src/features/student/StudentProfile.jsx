import { useForm } from "react-hook-form";
import { useGetUser } from "../../context/useGetUserContext";
import { useToast } from "../../context/useToastContext";
import Loading, { Loader } from "../../ui/Loading";
import {
  Button,
  createTheme,
  FileInput,
  FloatingLabel,
  ThemeProvider,
} from "flowbite-react";
import { CiEdit } from "react-icons/ci";
import { useEffect, useState } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
import useEditUser from "../../hooks/useEditUser";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import NotFound from "../../ui/NotFound";

const schema = yup.object().shape({
  name: yup.string().required("وارد کردن نام ونام خانوادگی الزامیست"),
  phone: yup
    .string()
    .matches(/^09\d{9}$/, "فرمت شماره موبایل صحیح نیست")
    .required("وارد کردن شماره همراه الزامیست"),
  email: yup
    .string()
    .email("فرمت ایمیل صحیح نیست")
    .required("وارد کردن ایمیل الزامیست"),
  profilePicture: yup
    .mixed()
    .nullable()
    .test("fileSize", "حجم فایل نباید بیش از 1 مگابایت باشد", (value) => {
      if (!value?.[0]) return true;
      return value[0].size <= 1000000;
    }),
});

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
  const { editUser, isUserEditing } = useEditUser(token);
  const { showToast } = useToast();
  const [preview, setPreview] = useState(null);
  const [isNameEditable, setIsNameEditable] = useState(false);
  const [isPhoneEditable, setIsPhoneEditable] = useState(false);
  const [isEmailEditable, setIsEmailEditable] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    setValue,
    watch,
    reset,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      profilePicture: null,
    },
  });

  const profilePicture = watch("profilePicture");
  const watchedName = watch("name");
  const watchedPhone = watch("phone");
  const watchedEmail = watch("email");

  const isFormChanged =
    watchedName !== user?.name ||
    watchedPhone !== user?.phone ||
    watchedEmail !== user?.email ||
    profilePicture?.[0];

  const nameRef = useOutsideClick(() => setIsNameEditable(false));
  const phoneRef = useOutsideClick(() => setIsPhoneEditable(false));
  const emailRef = useOutsideClick(() => setIsEmailEditable(false));

  useEffect(() => {
    if (user) {
      reset({
        name: user?.name || "",
        phone: user?.phone || "",
        email: user?.email || "",
        profilePicture: null,
      });
    }
  }, [reset, user]);

  useEffect(() => {
    if (profilePicture?.[0]) {
      const objectUrl = URL.createObjectURL(profilePicture[0]);
      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreview(null);
    }
  }, [profilePicture]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data?.name);
    formData.append("phone", data?.phone);
    formData.append("email", data?.email);
    if (data?.profilePicture && data?.profilePicture[0]) {
      formData.append("profilePicture", data?.profilePicture[0]);
    }
    await editUser({ userId: user?._id, updatedUser: formData });
    showToast("success", "اطلاعات با موفقیت ویرایش شد");
  };

  if (isError || !token) {
    showToast(
      "error",
      error?.response?.data?.message || "اطلاعات کاربری یافت نشد"
    );
    return <NotFound />;
  }

  if (isLoading) return <Loading />;

  return (
    <div className="container">
      <h1 className="text-xl font-bold">اطلاعات کاربری</h1>
      <div className="w-full h-[0.5px] my-10 bg-light-shade-yellow dark:bg-dark-purple transition-colors duration-300"></div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ThemeProvider theme={customTheme}>
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-6 flex-col sm:flex-row">
              {/* Name */}
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
                  {...register("name")}
                />
                <button
                  type="button"
                  className="absolute left-2 top-1/3 cursor-pointer"
                  onClick={() => setIsNameEditable(true)}
                >
                  <CiEdit className="w-4 h-4" />
                </button>
                {errors?.name && (
                  <p className="text-red-500 text-sm">
                    {errors?.name?.message}
                  </p>
                )}
              </div>

              {/* Phone */}
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
                  {...register("phone")}
                />
                <button
                  type="button"
                  className="absolute left-2 top-1/3 cursor-pointer"
                  onClick={() => setIsPhoneEditable(true)}
                >
                  <CiEdit className="w-4 h-4" />
                </button>
                {errors?.phone && (
                  <p className="text-red-500 text-sm">
                    {errors?.phone?.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-6 flex-col sm:flex-row">
              {/* Email */}
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
                  {...register("email")}
                />
                <button
                  type="button"
                  className="absolute left-2 top-1/3 cursor-pointer"
                  onClick={() => setIsEmailEditable(true)}
                >
                  <CiEdit className="w-4 h-4" />
                </button>
                {errors?.email && (
                  <p className="text-red-500 text-sm">
                    {errors?.email?.message}
                  </p>
                )}
              </div>

              <div id="fileUpload" className="relative">
                <FileInput
                  sizing="sm"
                  onChange={(e) => setValue("profilePicture", e.target.files)}
                />
                {errors?.profilePicture && (
                  <p className="text-red-500 text-sm">
                    {errors?.profilePicture?.message}
                  </p>
                )}
                {preview ? (
                  <img
                    src={preview}
                    alt={user?.name}
                    className="w-8 h-8 absolute top-1 left-2 rounded-full object-cover"
                  />
                ) : user?.profilePicture ? (
                  <img
                    src={user?.profilePicture}
                    alt={user?.name}
                    className="w-8 h-8 absolute top-1 left-2 rounded-full object-cover"
                  />
                ) : null}
              </div>
            </div>
          </div>
          <Button
            color="dark"
            outline
            type="submit"
            className="mt-4 cursor-pointer transition-colors duration-300"
            disabled={!isValid || isUserEditing || !isFormChanged}
          >
            {isUserEditing ? <Loader /> : "تایید"}
          </Button>
        </ThemeProvider>
      </form>
    </div>
  );
}

export default StudentProfile;
