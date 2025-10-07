import { useForm } from "react-hook-form";
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

const schema = Yup.object().shape({
  name: Yup.string().required("نام کاربر الزامی است"),
  email: Yup.string()
    .email("فرمت ایمیل معتبر نیست")
    .required("ایمیل الزامی است"),
  phone: Yup.string()
    .required("شماره همراه الزامی است")
    .matches(/^09\d{9}$/, "شماره همراه معتبر نیست"),
  enrolledCourses: Yup.string().nullable(),
  availableCourses: Yup.string().nullable(),
});

function UsersForm({
  onClose,
  userToEdit = {},
  courses,
  onConfirmDeleteCourse,
  onConfirmAddCourse,
}) {
  const { editUser, isUserEditing } = useEditUser();
  const { _id: editUserId } = userToEdit;

  const studentCourses = userToEdit?.enrolledCourses?.map(
    (course) => course?.course?._id
  );

  const enrolledCourses = courses?.filter((course) =>
    studentCourses?.includes(course?._id)
  );

  const availableCourses = courses?.filter(
    (course) => !studentCourses.includes(course?._id)
  );

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

  const selectedCourseIdToDelete = watch("enrolledCourses");
  const selectedCourseIdToAdd = watch("availableCourses");

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
    const updatedUser = {
      name: data?.name,
      email: data?.email,
      phone: data?.phone,
    };

    if (editUserId) {
      await editUser(
        { userId: editUserId, updatedUser },
        {
          onSuccess: () => {
            onClose();
            reset();
          },
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
              {...register("name")}
            />
            {errors?.name && (
              <p className="text-red-500 text-xs mt-2">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="flex relative flex-col w-full max-w-md">
            <FloatingLabel
              variant="outlined"
              label="ایمیل"
              sizing="sm"
              type="email"
              {...register("email")}
            />
            {errors?.email && (
              <p className="text-red-500 text-xs mt-2">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="flex relative flex-col w-full max-w-md">
            <FloatingLabel
              variant="outlined"
              label="شماره همراه"
              sizing="sm"
              type="tel"
              {...register("phone")}
            />
            {errors?.phone && (
              <p className="text-red-500 text-xs mt-2">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Enrolled Courses */}
          <div className="w-full flex justify-between items-center relative max-w-md">
            <Select
              color="gray"
              {...register("enrolledCourses")}
              className="w-full max-w-md mx-auto"
            >
              <option value="">-- دوره های ثبت نام شده --</option>
              {enrolledCourses?.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.name}
                </option>
              ))}
            </Select>
            <HiChevronDown className="w-5 h-5 absolute left-2" />
          </div>

          <Button
            color="red"
            className="flex items-center justify-center gap-x-4"
            disabled={!selectedCourseIdToDelete}
            onClick={() =>
              onConfirmDeleteCourse({
                userId: editUserId,
                courseId: selectedCourseIdToDelete,
              })
            }
          >
            <span>حذف دوره</span>
            <PiTrash className="w-5 h-5" />
          </Button>

          {/* Available Courses */}
          <div className="w-full flex justify-between items-center relative max-w-md">
            <Select
              color="gray"
              {...register("availableCourses")}
              className="w-full max-w-md mx-auto"
            >
              <option value="">-- دوره های ثبت نام نشده --</option>
              {availableCourses?.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.name}
                </option>
              ))}
            </Select>
            <HiChevronDown className="w-5 h-5 absolute left-2" />
          </div>

          <Button
            color="green"
            className="flex items-center justify-center gap-x-4"
            disabled={!selectedCourseIdToAdd}
            onClick={() =>
              onConfirmAddCourse({
                userId: editUserId,
                courseId: selectedCourseIdToAdd,
              })
            }
          >
            <span>ثبت نام دوره</span>
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
