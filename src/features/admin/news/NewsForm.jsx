import { useForm } from "react-hook-form";
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
import { useToast } from "../../../context/useToastContext";
import { Loader } from "../../../ui/Loading";
import useCreateNews from "../../../hooks/useCreateNews";
import useEditNews from "../../../hooks/useEditNews";

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
});

function NewsForm({ onClose, newsToEdit = {} }) {
  const [preview, setPreview] = useState(null);
  const { showToast } = useToast();
  const { createNews, isCreatingNews } = useCreateNews();
  const { editNews, isEditingNews } = useEditNews();
  const { _id: editNewsId } = newsToEdit;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const image = watch("image");

  useEffect(() => {
    if (editNewsId) {
      reset({
        title: newsToEdit.title,
        description: newsToEdit.description,
      });
    }
  }, [reset, editNewsId, newsToEdit]);

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
    console.log(data);

    const formData = new FormData();
    formData.append("title", data?.title);
    formData.append("description", data?.description);
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
    if (editNewsId) {
      await editNews(
        { newsId: editNewsId, newNews: formData },
        {
          onSuccess: () => {
            showToast("success", `${data?.title} با موفقیت ویرایش شد`);
            onClose();
            reset();
          },
          onError: (error) =>
            showToast(
              "error",
              error?.response?.data?.message ||
                `ویرایش ${data?.title} موفقیت آمیز نبود`
            ),
        }
      );
    } else {
      await createNews(formData, {
        onSuccess: () => {
          showToast("success", `${data?.title} با موفقیت ایجاد شد`);
          onClose();
          reset();
        },
        onError: (error) =>
          showToast(
            "error",
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
          <div className="flex relative flex-col">
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
            ) : newsToEdit?.image ? (
              <img
                src={newsToEdit?.image}
                alt={newsToEdit?.title}
                className="w-8 h-8 absolute top-1 left-2 rounded-full object-cover"
              />
            ) : null}
          </div>
        </div>
        <Button
          color="dark"
          outline
          type="submit"
          pill
          className="mt-4"
          disabled={!isValid || isCreatingNews || isEditingNews}
        >
          {isEditingNews || isCreatingNews ? <Loader /> : "تایید"}
        </Button>
      </ThemeProvider>
    </form>
  );
}

export default NewsForm;
