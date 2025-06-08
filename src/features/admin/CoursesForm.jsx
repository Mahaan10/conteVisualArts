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
  startDate: Yup.date()
    .typeError("تاریخ شروع الزامی است")
    .required("تاریخ شروع الزامی است"),
  Image: Yup.mixed()
    .nullable()
    .test("fileSize", "حجم فایل نباید بیش از 8 مگابایت باشد", (value) => {
      if (!value?.[0]) return true;
      return value[0].size <= 8000000;
    }),
});

function CoursesForm({ onClose, courseToEdit = {} }) {
  const [preview, setPreview] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const { createCourse, isCreatingCourse } = useCreateCourse();
  const { editCourse, isEditingCourse } = useEditCourse();
  const { _id: editCourseId } = courseToEdit;
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors, isValid },
  } = useForm({ mode: "onBlur", resolver: yupResolver(schema) });

  useEffect(() => {
    if (editCourseId) {
      reset({
        name: courseToEdit.name,
        description: courseToEdit.description,
        duration: courseToEdit.duration,
        price: courseToEdit.price,
        availableSeats: courseToEdit.availableSeats,
        startDate: courseToEdit.startDate,
      });
    }
  }, [reset, editCourseId, courseToEdit]);

  return (
    <form /* onSubmit={handleSubmit(onSubmit)} */>
      <ThemeProvider theme={customTheme}>
        <div className="flex flex-col gap-6 items-center">
          {/* Name */}
          <div className="flex relative flex-col">
            <FloatingLabel
              variant="outlined"
              label="عنوان"
              sizing="sm"
              type="text"
              //disabled={!isNameEditable}
              className={`transition-all duration-300`}
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
              //disabled={!isPhoneEditable}
              className={`transition-all duration-300`}
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
              //disabled={!isEmailEditable}
              className={`transition-all duration-300`}
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
              //disabled={!isEmailEditable}
              className={`transition-all duration-300`}
              {...register("price")}
            />
            {errors?.price && (
              <p className="text-red-500 text-xs mt-2">
                {errors?.price?.message}
              </p>
            )}
          </div>

          <div id="fileUpload" className="relative">
            <FileInput
              sizing="sm"
              onChange={(e) => setValue("profilePicture", e.target.files)}
            />
            {errors?.profilePicture && (
              <p className="text-red-500 text-xs mt-2">
                {errors?.profilePicture?.message}
              </p>
            )}
            {preview ? (
              <img
                src={preview}
                alt={courseToEdit?.name}
                className="w-8 h-8 absolute top-1 left-2 rounded-full object-cover"
              />
            ) : courseToEdit?.profilePicture ? (
              <img
                src={courseToEdit?.profilePicture}
                alt={courseToEdit?.name}
                className="w-8 h-8 absolute top-1 left-2 rounded-full object-cover"
              />
            ) : null}
          </div>
          {/* availableSeats */}
          <div className="flex relative flex-col">
            <FloatingLabel
              variant="outlined"
              label="ظرفیت"
              sizing="sm"
              type="text"
              //disabled={!isEmailEditable}
              className={`transition-all duration-300`}
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
              control={control}
              name="startDate"
              defaultValue={null}
              rules={{ required: "تاریخ شروع الزامی است" }}
              render={({ field }) => (
                <Calendar value={field.value} onChange={field.onChange} />
              )}
            />
            {errors?.startDate && (
              <p className="text-red-500 text-xs mt-2">
                {errors?.startDate?.message}
              </p>
            )}
          </div>
        </div>
        <Button
          color="dark"
          outline
          type="submit"
          className="mt-4 cursor-pointer transition-colors duration-300"
          disabled={!isValid}
        >
          {isEditingCourse ? <Loader /> : "تایید"}
        </Button>
      </ThemeProvider>
    </form>
  );
}

export default CoursesForm;
