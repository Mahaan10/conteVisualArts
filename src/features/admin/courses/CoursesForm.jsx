import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import {
  Button,
  createTheme,
  FileInput,
  FloatingLabel,
  Select,
  ThemeProvider,
} from "flowbite-react";
import { DateObject } from "react-multi-date-picker";
import useCreateCourse from "../../../hooks/useCreateCourse";
import useEditCourse from "../../../hooks/useEditCourse";
import Calendar from "../../../ui/Calendar";
import { Loader } from "../../../ui/Loading";
import { HiChevronDown } from "react-icons/hi";
import { numberWithCommas } from "../../../utils/toPersianNumbers";
import toast from "react-hot-toast";

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
  fileInput: {
    sizes: {
      sm: "w-full sm:min-w-md max-w-lg bg-inherit dark:bg-inherit",
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
      if (!value || value.length === 0) return true;
      return value[0].size <= 8 * 1024 * 1024;
    })
    .test("fileFormat", "فقط فرمت‌های jpeg, jpg, png مجاز است", (value) => {
      if (!value || value.length === 0) return true;
      return ["image/jpeg", "image/jpg", "image/png"].includes(value[0].type);
    }),
  courseImages: Yup.mixed()
    .nullable()
    .test("is-image-array", "فرمت فایل نامعتبر است", (value) => {
      if (!value || value.length === 0) return true;
      return Array.from(value).every((file) =>
        ["image/jpeg", "image/jpg", "image/png"].includes(file.type)
      );
    })
    .test("image-size", "هر تصویر باید کمتر از ۸ مگابایت باشد", (value) => {
      if (!value || value.length === 0) return true;
      return Array.from(value).every((file) => file.size <= 8 * 1024 * 1024);
    })
    .test("max-images", "حداکثر ۷ تصویر مجاز است", (value) => {
      if (!value || value.length === 0) return true;
      return value.length <= 7;
    }),
  isActive: Yup.string().required("وضعیت دوره الزامی است"),
  ageGroup: Yup.string(),
  badge: Yup.string(),
});

function CoursesForm({ onClose, courseToEdit = {} }) {
  const [preview, setPreview] = useState(null);
  const [courseImagesPreview, setCourseImagesPreview] = useState([]);
  const [rawPrice, setRawPrice] = useState("");
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
      price: 0,
    },
  });

  const Image = watch("Image");
  const courseImages = watch("courseImages");

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
        isActive: courseToEdit.isActive === true ? "true" : "false",
        ageGroup: courseToEdit.ageGroup || "",
        badge: courseToEdit.badge || "",
      });
      const priceStr = courseToEdit.price.toString() || "";
      const formattedPrice = numberWithCommas(priceStr);
      setRawPrice(formattedPrice);
      setValue("price", Number(priceStr), { shouldValidate: true });
    }
  }, [reset, editCourseId, courseToEdit, setValue]);

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
    if (courseImages?.length > 0) {
      const urls = Array.from(courseImages).map((file) =>
        URL.createObjectURL(file)
      );
      setCourseImagesPreview(urls);

      return () => {
        urls.forEach((url) => URL.revokeObjectURL(url));
      };
    } else {
      setCourseImagesPreview([]);
    }
  }, [courseImages]);

  const onSubmit = async (data) => {
    const startDateToISO = data?.startDate.toDate().toISOString();

    const formData = new FormData();
    formData.append("name", data?.name);
    formData.append("description", data?.description);
    formData.append("duration", data?.duration);
    formData.append("price", data?.price);
    formData.append("availableSeats", data?.availableSeats);
    formData.append("startDate", startDateToISO);
    formData.append("isActive", data?.isActive === "true");
    formData.append("ageGroup", data?.ageGroup);
    formData.append("badge", data?.badge);
    if (data?.Image && data?.Image[0]) {
      formData.append("Image", data?.Image[0]);
    }
    if (data?.courseImages && data?.courseImages.length > 0) {
      Array.from(data.courseImages).forEach((file) => {
        formData.append("courseImages", file);
      });
    }

    if (editCourseId) {
      await editCourse(
        { courseId: editCourseId, newCourse: formData },
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
    } else {
      await createCourse(formData, {
        onSuccess: () => {
          toast.success(`${data?.name} با موفقیت ایجاد شد`);
          onClose();
          reset();
        },
        onError: (error) =>
          toast.error(
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
          <div className="flex relative flex-col w-full max-w-md">
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
          <div className="flex relative flex-col w-full max-w-md">
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
          <div className="flex relative flex-col w-full max-w-md">
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
          <div className="flex flex-col w-full max-w-md">
            <FloatingLabel
              variant="outlined"
              label="قیمت (تومان)"
              sizing="sm"
              type="text"
              value={rawPrice}
              onChange={(e) => {
                const onlyDigits = e.target.value.replace(/\D/g, "");
                const formatted = numberWithCommas(onlyDigits);
                setRawPrice(formatted);
                setValue("price", Number(onlyDigits), { shouldValidate: true });
              }}
              className="transition-all duration-300"
            />

            {errors?.price && (
              <p className="text-red-500 text-xs mt-2">
                {errors?.price?.message}
              </p>
            )}
          </div>

          {/* image Upload */}
          <div id="fileUpload" className="relative w-full max-w-md">
            <FileInput
              sizing="sm"
              accept="Image/*"
              name="Image"
              onChange={(e) =>
                setValue("Image", e.target.files, { shouldValidate: true })
              }
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

          {/* courseImages Upload */}
          <div id="filesUpload" className="relative w-full max-w-md">
            <FileInput
              sizing="sm"
              accept="image/*"
              name="courseImages"
              multiple
              onChange={(e) =>
                setValue("courseImages", e.target.files, {
                  shouldValidate: true,
                })
              }
            />
            {errors?.courseImages && (
              <p className="text-red-500 text-xs mt-2">
                {errors?.courseImages?.message}
              </p>
            )}

            {courseImagesPreview.length > 0
              ? courseImagesPreview.map((url, i) => (
                  <img
                    key={i}
                    src={url}
                    alt={`course-img-${i}`}
                    className="w-8 h-8 absolute top-1 left-2 rounded-full object-cover"
                    style={{ left: `${2 + i * 36}px` }}
                  />
                ))
              : courseToEdit?.courseImages &&
                courseToEdit.courseImages.length > 0
              ? courseToEdit.courseImages.map((imgUrl, i) => (
                  <img
                    key={i}
                    src={imgUrl}
                    alt={`existing-course-img-${i}`}
                    className="w-8 h-8 absolute top-1 left-2 rounded-full object-cover"
                    style={{ left: `${2 + i * 36}px` }}
                  />
                ))
              : null}
          </div>

          {/* Available Seats */}
          <div className="flex relative flex-col w-full max-w-md">
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
          {/* ageGroup */}
          <div className="w-full flex justify-between items-center relative max-w-md">
            <Select
              color="gray"
              {...register("ageGroup")}
              className="w-full max-w-md mx-auto"
            >
              <option value="">-- رده سنی --</option>
              <option value="child">کودکان</option>
              <option value="adult">بزرگسالان</option>
            </Select>

            <HiChevronDown className="w-5 h-5 absolute left-2" />

            {errors?.ageGroup && (
              <p className="text-red-500 text-xs mt-2">
                {errors?.ageGroup?.message}
              </p>
            )}
          </div>

          {/* Badge */}
          <div className="w-full flex justify-between items-center relative max-w-md">
            <Select
              color="gray"
              className="w-full max-w-md mx-auto"
              id="badge"
              {...register("badge")}
            >
              <option value="">-- آیتم --</option>
              <option value="special">ویژه</option>
              <option value="summer">تابستانی</option>
              <option value="autumn">پائیزی</option>
            </Select>

            <HiChevronDown className="w-5 h-5 absolute left-2" />

            {errors?.badge && (
              <p className="text-red-500 text-xs mt-2">
                {errors?.badge?.message}
              </p>
            )}
          </div>

          {/* Calendar */}
          <div className="flex relative flex-col w-full max-w-md">
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
          className="mt-8"
          disabled={!isValid || isCreatingCourse || isEditingCourse}
        >
          {isEditingCourse || isCreatingCourse ? <Loader /> : "تایید"}
        </Button>
      </ThemeProvider>
    </form>
  );
}

export default CoursesForm;
