import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import {
  Button,
  createTheme,
  FloatingLabel,
  Select,
  ThemeProvider,
} from "flowbite-react";
import useEditUser from "../../../hooks/useEditUser";
import { Loader } from "../../../ui/Loading";
import { HiChevronDown } from "react-icons/hi";
import toast from "react-hot-toast";
import { PiTrash } from "react-icons/pi";

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
          sm: "w-full sm:min-w-md max-w-lg",
        },
      },
    },
  },
  button: {
    base: "w-full max-w-md mx-auto rounded-lg cursor-pointer",
  },
  select: {
    field: {
      select: {
        base: " bg-none",
        colors: {
          gray: "bg-whitesmoke dark:bg-gray-950",
        },
      },
    },
  },
});

/* const schema = Yup.object().shape({
  name: Yup.string().required("عنوان الزامی است"),
  description: Yup.string().required("توضیحات الزامی است"),
  duration: Yup.number()
    .typeError("تعداد جلسات باید عدد باشد")
    .required("تعداد جلسات الزامی است")
    .positive("تعداد جلسات باید بیشتر از صفر باشد"),
  price: Yup.number()
    .typeError("قیمت باید عدد باشد")
    .required("قیمت الزامی است")
    .min(0, "قیمت نمی‌تواند منفی باشد"),
  availableSeats: Yup.number()
    .typeError("ظرفیت باید عدد باشد")
    .required("ظرفیت الزامی است")
    .min(1, "حداقل ظرفیت ۱ نفر است"),
  isActive: Yup.string().required("وضعیت دوره الزامی است"),
  ageGroup: Yup.string(),
  badge: Yup.string(),
}); */

const schema = Yup.object().shape({
  name: Yup.string().required("نام کاربر الزامی است"),
  email: Yup.string()
    .email("فرمت ایمیل معتبر نیست")
    .required("ایمیل الزامی است"),
  phone: Yup.string()
    .required("شماره همراه الزامی است")
    .matches(/^09\d{9}$/, "شماره همراه معتبر نیست"),
  enrolledCourses: Yup.string().nullable(),
});
function UsersForm({ onClose, userToEdit = {} }) {
  const { editUser, isUserEditing } = useEditUser();
  const { _id: editUserId } = userToEdit;

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const selectedCourse = watch("enrolledCourses");

  useEffect(() => {
    if (editUserId) {
      reset({
        name: userToEdit.name,
        email: userToEdit.email,
        phone: userToEdit.phone,
      });
    }
  }, [reset, editUserId, userToEdit]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data?.name);
    formData.append("email", data?.email);
    formData.append("phone", data?.phone);

    if (editUserId) {
      await editUser(
        { courseId: editUserId, newCourse: formData },
        {
          onSuccess: () => {
            toast.success(`${data?.name} با موفقیت ویرایش شد`);
            onClose();
            reset();
          },
          onError: (error) =>
            toast.error(
              error?.response?.data?.message ||
                `ویرایش ${data?.name} موفقیت آمیز نبود`
            ),
        }
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ThemeProvider theme={customTheme}>
        <div className="flex flex-col gap-6 items-center">
          {/* Name */}
          <div className="flex relative flex-col w-full max-w-md">
            <FloatingLabel
              variant="outlined"
              label="نام"
              sizing="sm"
              type="text"
              className="transition-all duration-300"
              {...register("name")}
            />
            {errors?.name && (
              <p className="text-red-500 text-xs mt-2">
                {errors?.name?.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="flex relative flex-col w-full max-w-md">
            <FloatingLabel
              variant="outlined"
              label="ایمیل"
              sizing="sm"
              type="email"
              className="transition-all duration-300"
              {...register("email")}
            />
            {errors?.email && (
              <p className="text-red-500 text-xs mt-2">
                {errors?.email?.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="flex relative flex-col w-full max-w-md">
            <FloatingLabel
              variant="outlined"
              label="شماره همراه"
              sizing="sm"
              type="number"
              className="transition-all duration-300"
              {...register("phone")}
            />
            {errors?.phone && (
              <p className="text-red-500 text-xs mt-2">
                {errors?.phone?.message}
              </p>
            )}
          </div>

          {/* enrolledCourses */}
          <div className="w-full flex justify-between items-center relative max-w-md">
            <Select
              color="gray"
              {...register("enrolledCourses")}
              className="w-full max-w-md mx-auto"
            >
              <option value="">-- دوره های ثبت نام کرده --</option>
              {userToEdit?.enrolledCourses?.map((user) => (
                <option key={user?._id} value={user?.enrolledCourses?._id}>
                  {user?.course?.name}
                </option>
              ))}
            </Select>

            <HiChevronDown className="w-5 h-5 absolute left-2" />

            {errors?.enrolledCourses && (
              <p className="text-red-500 text-xs mt-2">
                {errors?.enrolledCourses?.message}
              </p>
            )}
          </div>

          <Button
            color="red"
            className="flex items-center justify-center gap-x-4"
            disabled={!selectedCourse}
            //onClick={onDelete}
          >
            <span>حذف دوره</span>
            <PiTrash className="w-5 h-5" />
          </Button>

          <Button
            color="dark"
            outline
            type="submit"
            className="mt-8"
            disabled={!isValid || isUserEditing}
          >
            {isUserEditing ? <Loader /> : "تایید"}
          </Button>
        </div>
      </ThemeProvider>
    </form>
  );
}

export default UsersForm;
