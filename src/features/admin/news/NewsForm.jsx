import { Controller, useForm } from "react-hook-form";
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
import { Loader } from "../../../ui/Loading";
import useCreateNews from "../../../hooks/useCreateNews";
import useEditNews from "../../../hooks/useEditNews";
import toast from "react-hot-toast";
import { DateObject } from "react-multi-date-picker";
import Calendar from "../../../ui/Calendar";
import { HiChevronDown } from "react-icons/hi2";

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
  title: Yup.string().required("عنوان الزامی است"),
  description: Yup.string().required("توضیحات الزامی است"),
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
  newsImages: Yup.mixed()
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
  badge: Yup.string(),
});

function NewsForm({ onClose, newsToEdit = {} }) {
  const [preview, setPreview] = useState(null);
  const [newsImagesPreview, setNewsImagesPreview] = useState([]);
  const { createNews, isCreatingNews } = useCreateNews();
  const { editNews, isEditingNews } = useEditNews();
  const { _id: editNewsId } = newsToEdit;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    control,
    formState: { errors, isValid },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const Image = watch("Image");
  const newsImages = watch("newsImages");

  useEffect(() => {
    if (editNewsId) {
      reset({
        title: newsToEdit.title,
        description: newsToEdit.description,
        badge: newsToEdit.badge || "",
        startDate: newsToEdit.startDate
          ? new DateObject(new Date(newsToEdit.startDate))
          : null,
      });
    }
  }, [reset, editNewsId, newsToEdit]);

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
    if (newsImages?.length > 0) {
      const urls = Array.from(newsImages).map((file) =>
        URL.createObjectURL(file)
      );
      setNewsImagesPreview(urls);

      return () => {
        urls.forEach((url) => URL.revokeObjectURL(url));
      };
    } else {
      setNewsImagesPreview([]);
    }
  }, [newsImages]);

  const onSubmit = async (data) => {
    const startDateToISO = data?.startDate.toDate().toISOString();

    const formData = new FormData();
    formData.append("title", data?.title);
    formData.append("description", data?.description);
    formData.append("startDate", startDateToISO);
    formData.append("badge", data?.badge);
    if (data?.Image && data?.Image[0]) {
      formData.append("Image", data?.Image[0]);
    }
    if (data?.newsImages && data?.newsImages.length > 0) {
      Array.from(data.newsImages).forEach((file) => {
        formData.append("newsImages", file);
      });
    }

    if (editNewsId) {
      await editNews(
        { newsId: editNewsId, newNews: formData },
        {
          onSuccess: () => {
            toast.success(`${data?.title} با موفقیت ویرایش شد`);
            onClose();
            reset();
          },
          onError: (error) =>
            toast.error(
              error?.response?.data?.message ||
                `ویرایش ${data?.title} موفقیت آمیز نبود`
            ),
        }
      );
    } else {
      await createNews(formData, {
        onSuccess: () => {
          toast.success("success", `${data?.title} با موفقیت ایجاد شد`);
          onClose();
          reset();
        },
        onError: (error) =>
          toast.error(
            error?.response?.data?.message ||
              `ایجاد ${data?.title} موفقیت آمیز نبود`
          ),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ThemeProvider theme={customTheme}>
        <div className="flex flex-col gap-6 items-center">
          {/* Title */}
          <div className="flex relative flex-col w-full max-w-md">
            <FloatingLabel
              variant="outlined"
              label="عنوان"
              sizing="sm"
              type="text"
              className="transition-all duration-300"
              {...register("title")}
            />
            {errors?.title && (
              <p className="text-red-500 text-xs mt-2">
                {errors?.title?.message}
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

          {/* File Upload */}
          <div id="fileUpload" className="relative w-full max-w-md">
            <FileInput
              sizing="sm"
              accept="image/*"
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
            ) : newsToEdit?.Image ? (
              <img
                src={newsToEdit?.Image}
                alt={newsToEdit?.title}
                className="w-8 h-8 absolute top-1 left-2 rounded-full object-cover"
              />
            ) : null}
          </div>

          {/* newsImages Upload */}
          <div id="filesUpload" className="relative w-full max-w-md">
            <FileInput
              sizing="sm"
              accept="image/*"
              name="newsImages"
              multiple
              onChange={(e) =>
                setValue("newsImages", e.target.files, {
                  shouldValidate: true,
                })
              }
            />
            {errors?.newsImages && (
              <p className="text-red-500 text-xs mt-2">
                {errors?.newsImages?.message}
              </p>
            )}

            {newsImagesPreview.length > 0
              ? newsImagesPreview.map((url, i) => (
                  <img
                    key={i}
                    src={url}
                    alt={`news-img-${i}`}
                    className="w-8 h-8 absolute top-1 left-2 rounded-full object-cover"
                    style={{ left: `${2 + i * 36}px` }}
                  />
                ))
              : newsToEdit?.newsImages && newsToEdit.newsImages.length > 0
              ? newsToEdit.newsImages.map((imgUrl, i) => (
                  <img
                    key={i}
                    src={imgUrl}
                    alt={`existing-news-img-${i}`}
                    className="w-8 h-8 absolute top-1 left-2 rounded-full object-cover"
                    style={{ left: `${2 + i * 36}px` }}
                  />
                ))
              : null}
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
              <option value="new">جدید</option>
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
        </div>
        <Button
          color="dark"
          outline
          type="submit"
          className="mt-8"
          disabled={!isValid || isCreatingNews || isEditingNews}
        >
          {isEditingNews || isCreatingNews ? <Loader /> : "تایید"}
        </Button>
      </ThemeProvider>
    </form>
  );
}

export default NewsForm;
