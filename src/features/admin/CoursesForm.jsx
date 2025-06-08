import { useForm, Controller } from "react-hook-form";
import useCreateCourse from "../../hooks/useCreateCourse";
import useEditCourse from "../../hooks/useEditCourse";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import {
  Button,
  createTheme,
  FileInput,
  FloatingLabel,
  ThemeProvider,
} from "flowbite-react";
import { Loader } from "../../ui/Loading";
import Calendar from "../../ui/Calendar";
import { useToast } from "../../context/useToastContext";
import { DateObject } from "react-multi-date-picker";

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
          sm: "min-w-md max-w-lg",
        },
      },
    },
  },
  fileInput: {
    sizes: {
      sm: "min-w-md max-w-lg bg-inherit dark:bg-inherit",
    },
  },
});

const schema = Yup.object().shape({
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
  startDate: Yup.mixed()
    .required("تاریخ شروع الزامی است")
    .test("is-date-object", "تاریخ معتبر نیست", (value) => {
      return (
        value instanceof DateObject &&
        typeof value.toDate === "function" &&
        !!value.toDate()
      );
    }),
  Image: Yup.mixed()
    .nullable()
    .test("fileSize", "حجم فایل نباید بیش از 8 مگابایت باشد", (value) => {
      if (!value?.[0]) return true;
      return value[0].size <= 8000000;
    }),
  isActive: Yup.string().required("وضعیت دوره الزامی است"),
});

function CoursesForm({ onClose, courseToEdit = {} }) {
  const [preview, setPreview] = useState(null);
  const { showToast } = useToast();
  const { createCourse, isCreatingCourse } = useCreateCourse();
  const { editCourse, isEditingCourse } = useEditCourse();
  const { _id: editCourseId } = courseToEdit;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
    defaultValues: {
      startDate: null,
      isActive: "true",
    },
  });

  const Image = watch("Image");

  useEffect(() => {
    if (editCourseId) {
      reset({
        name: courseToEdit.name,
        description: courseToEdit.description,
        duration: courseToEdit.duration,
        price: courseToEdit.price,
        availableSeats: courseToEdit.availableSeats,
        startDate: courseToEdit.startDate
          ? new DateObject(new Date(courseToEdit.startDate))
          : null,
        isActive: courseToEdit.isActive ? "true" : "false",
      });
    }
  }, [reset, editCourseId, courseToEdit]);

  useEffect(() => {
    if (Image?.[0]) {
      const objectUrl = URL.createObjectURL(Image[0]);
      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreview(null);
    }
  }, [Image]);

  useEffect(() => {
    console.log("🟡 startDate value is: ", watch("startDate"));
  }, [watch]);

  const onSubmit = async (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("name", data?.name);
    formData.append("description", data?.description);
    formData.append("duration", data?.duration);
    formData.append("price", data?.price);
    formData.append("availableSeats", data?.availableSeats);
    formData.append("startDate", data?.startDate?.toDate().toISOString());
    formData.append("isActive", data?.isActive);
    if (data?.Image && data?.Image[0]) {
      formData.append("Image", data?.Image[0]);
    }
    console.log(formData);

    const updatedCourse = {
      ...formData,
      name: data?.name,
      description: data?.description,
      duration: data?.duration,
      price: data?.price,
      availableSeats: data?.availableSeats,
      startDate: data?.startDate?.toDate().toISOString(),
      isActive: data?.isActive,
    };
    if (editCourseId) {
      await editCourse(
        { courseId: editCourseId, newCourse: updatedCourse },
        {
          onSuccess: () => {
            showToast("success", `${data?.name} با موفقیت ویرایش شد`);
            onClose();
            reset();
          },
          onError: (error) =>
            showToast(
              "error",
              error?.response?.data?.message ||
                `ویرایش ${data?.name} موفقیت آمیز نبود`
            ),
        }
      );
    } else {
      await createCourse(formData, {
        onSuccess: () => {
          showToast("success", `${data?.name} با موفقیت ایجاد شد`);
          onClose();
          reset();
        },
        onError: (error) =>
          showToast(
            "error",
            error?.response?.data?.message ||
              `ایجاد ${data?.name} موفقیت آمیز نبود`
          ),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ThemeProvider theme={customTheme}>
        <div className="flex flex-col gap-6 items-center">
          {/* Name */}
          <div className="flex relative flex-col">
            <FloatingLabel
              variant="outlined"
              label="عنوان"
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

          {/* Description */}
          <div className="flex relative flex-col">
            <FloatingLabel
              variant="outlined"
              label="توضیحات"
              sizing="sm"
              type="text"
              className="transition-all duration-300"
              {...register("description")}
            />
            {errors?.description && (
              <p className="text-red-500 text-xs mt-2">
                {errors?.description?.message}
              </p>
            )}
          </div>

          {/* Duration */}
          <div className="flex relative flex-col">
            <FloatingLabel
              variant="outlined"
              label="تعداد جلسات"
              sizing="sm"
              type="text"
              className="transition-all duration-300"
              {...register("duration")}
            />
            {errors?.duration && (
              <p className="text-red-500 text-xs mt-2">
                {errors?.duration?.message}
              </p>
            )}
          </div>

          {/* Price */}
          <div className="flex relative flex-col">
            <FloatingLabel
              variant="outlined"
              label="قیمت"
              sizing="sm"
              type="text"
              className="transition-all duration-300"
              {...register("price")}
            />
            {errors?.price && (
              <p className="text-red-500 text-xs mt-2">
                {errors?.price?.message}
              </p>
            )}
          </div>

          {/* File Upload */}
          <div id="fileUpload" className="relative">
            <FileInput
              sizing="sm"
              onChange={(e) => setValue("Image", e.target.files)}
            />
            {errors?.Image && (
              <p className="text-red-500 text-xs mt-2">
                {errors?.Image?.message}
              </p>
            )}
            {preview ? (
              <img
                src={preview}
                alt=""
                className="w-8 h-8 absolute top-1 left-2 rounded-full object-cover"
              />
            ) : courseToEdit?.Image ? (
              <img
                src={courseToEdit?.Image}
                alt={courseToEdit?.name}
                className="w-8 h-8 absolute top-1 left-2 rounded-full object-cover"
              />
            ) : null}
          </div>

          {/* Available Seats */}
          <div className="flex relative flex-col">
            <FloatingLabel
              variant="outlined"
              label="ظرفیت"
              sizing="sm"
              type="text"
              className="transition-all duration-300"
              {...register("availableSeats")}
            />
            {errors?.availableSeats && (
              <p className="text-red-500 text-xs mt-2">
                {errors?.availableSeats?.message}
              </p>
            )}
          </div>

          {/* Calendar */}
          <div className="flex relative flex-col w-full">
            <Controller
              name="startDate"
              control={control}
              render={({ field }) => (
                <Calendar value={field.value} onChange={field.onChange} />
              )}
            />
            {errors.startDate && (
              <span className="text-red-500 text-xs mt-2">
                {errors.startDate.message}
              </span>
            )}
          </div>

          {/* isActive */}
          <p className="text-sm text-right font-medium">وضعیت دوره:</p>
          <div className="flex items-center justify-center gap-x-5 w-full">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="true"
                {...register("isActive")}
                className="accent-dark"
              />
              <span className="text-sm">فعال</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="false"
                {...register("isActive")}
                className="accent-dark"
              />
              <span className="text-sm">غیرفعال</span>
            </label>
          </div>
          {errors?.isActive && (
            <p className="text-red-500 text-xs mt-2">
              {errors?.isActive?.message}
            </p>
          )}
        </div>

        <Button
          color="dark"
          outline
          type="submit"
          className="mt-4"
          disabled={!isValid}
        >
          {isEditingCourse || isCreatingCourse ? <Loader /> : "تایید"}
        </Button>
      </ThemeProvider>
    </form>
  );
}

export default CoursesForm;
