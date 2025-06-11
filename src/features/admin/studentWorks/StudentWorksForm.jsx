import { useForm, Controller } from "react-hook-form";
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
import { DateObject } from "react-multi-date-picker";
import { useToast } from "../../../context/useToastContext";
import Calendar from "../../../ui/Calendar";
import useCreateStudentWorks from "../../../hooks/useCreateStudentWorks";
import useEditStudentWorks from "../../../hooks/useEditStudentWorks";

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
  title: Yup.string().required("عنوان الزامی است"),
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
  image: Yup.mixed()
    .nullable()
    .test("fileSize", "حجم فایل نباید بیش از 8 مگابایت باشد", (value) => {
      if (!value || value.length === 0) return true;
      return value[0].size <= 8 * 1024 * 1024;
    })
    .test("fileFormat", "فقط فرمت‌های jpeg, jpg, png مجاز است", (value) => {
      if (!value || value.length === 0) return true;
      return ["image/jpeg", "image/jpg", "image/png"].includes(value[0].type);
    }),
  isActive: Yup.string().required("وضعیت دوره الزامی است"),
});

function StudentWorksForm({ onClose, artWorkToEdit = {} }) {
  const [preview, setPreview] = useState(null);
  const { showToast } = useToast();
  const { createArtWork, isCreatingArtWork } = useCreateStudentWorks();
  const { editArtWork, isEditingStudentWorks } = useEditStudentWorks();
  const { _id: editArtWorkId } = artWorkToEdit;

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
    },
  });

  const image = watch("image");

  useEffect(() => {
    if (editArtWorkId) {
      reset({
        name: artWorkToEdit.name,
        description: artWorkToEdit.description,
        duration: artWorkToEdit.duration,
        price: artWorkToEdit.price,
        availableSeats: artWorkToEdit.availableSeats,
        startDate: artWorkToEdit.startDate
          ? new DateObject(new Date(artWorkToEdit.startDate))
          : null,
        isActive: artWorkToEdit.isActive === true ? "true" : "false",
      });
    }
  }, [reset, editArtWorkId, artWorkToEdit]);

  useEffect(() => {
    if (image?.[0]) {
      const objectUrl = URL.createObjectURL(image[0]);
      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreview(null);
    }
  }, [image]);

  const onSubmit = async (data) => {
    const startDateToISO = data?.startDate.toDate().toISOString();
    console.log(data);

    const formData = new FormData();
    formData.append("name", data?.name);
    formData.append("description", data?.description);
    formData.append("duration", data?.duration);
    formData.append("price", data?.price);
    formData.append("availableSeats", data?.availableSeats);
    formData.append("startDate", startDateToISO);
    formData.append("isActive", data?.isActive === "true");
    if (data?.image && data?.image[0]) {
      formData.append("image", data?.image[0]);
    }
    console.log(formData);

    /* const updatedCourse = {
      ...formData,
      name: data?.name,
      description: data?.description,
      duration: data?.duration,
      price: data?.price,
      availableSeats: data?.availableSeats,
      startDate: data?.startDate?.toDate().toISOString(),
      isActive: data?.isActive,
    }; */
    if (editArtWorkId) {
      await editArtWork(
        { artWorkId: editArtWorkId, newArtWork: formData },
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
      await createArtWork(formData, {
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
              type="number"
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
              type="number"
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
              accept="image/*"
              name="image"
              onChange={(e) =>
                setValue("image", e.target.files, { shouldValidate: true })
              }
            />
            {errors?.image && (
              <p className="text-red-500 text-xs mt-2">
                {errors?.image?.message}
              </p>
            )}
            {preview ? (
              <img
                src={preview}
                alt=""
                className="w-8 h-8 absolute top-1 left-2 rounded-full object-cover"
              />
            ) : artWorkToEdit?.Image ? (
              <img
                src={artWorkToEdit?.Image}
                alt={artWorkToEdit?.name}
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
              type="number"
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
              render={({ field: { onChange, value } }) => (
                <Calendar value={value} onChange={(date) => onChange(date)} />
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
          pill
          className="mt-4"
          disabled={!isValid || isCreatingArtWork || isEditingStudentWorks}
        >
          {isEditingStudentWorks || isCreatingArtWork ? <Loader /> : "تایید"}
        </Button>
      </ThemeProvider>
    </form>
  );
}

export default StudentWorksForm;
