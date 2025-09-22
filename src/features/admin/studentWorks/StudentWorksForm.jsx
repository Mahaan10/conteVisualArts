import { useForm } from "react-hook-form";
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
import { useToast } from "../../../context/useToastContext";
import useCreateStudentWorks from "../../../hooks/useCreateStudentWorks";
import useEditStudentWorks from "../../../hooks/useEditStudentWorks";
import { Loader } from "../../../ui/Loading";
import { HiChevronDown } from "react-icons/hi";

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
  course: Yup.string().required("انتخاب دوره الزامی است"),
  student: Yup.string().required("انتخاب هنرجو الزامی است"),
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
});

function StudentWorksForm({ courses, students, onClose, artWorkToEdit = {} }) {
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
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const Image = watch("Image");

  useEffect(() => {
    if (editArtWorkId) {
      reset({
        title: artWorkToEdit?.title,
        description: artWorkToEdit?.description,
        course: artWorkToEdit?.course?._id || "",
        student: artWorkToEdit?.student?._id || "",
      });
    }
  }, [reset, editArtWorkId, artWorkToEdit]);

  useEffect(() => {
    if (Image?.[0]) {
      const objectUrl = URL.createObjectURL(Image[0]);
      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreview(null);
    }
  }, [Image]);

  const onSubmit = async (data) => {

    const formData = new FormData();
    formData.append("title", data?.title);
    formData.append("description", data?.description);
    formData.append("course", data?.course);
    formData.append("student", data?.student);
    if (data?.Image && data?.Image[0]) {
      formData.append("Image", data?.Image[0]);
    }

    if (editArtWorkId) {
      await editArtWork(
        { artWorkId: editArtWorkId, newArtWork: formData },
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
      await createArtWork(formData, {
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
            ) : artWorkToEdit?.Image ? (
              <img
                src={artWorkToEdit?.Image}
                alt={artWorkToEdit?.title}
                className="w-8 h-8 absolute top-1 left-2 rounded-full object-cover"
              />
            ) : null}
          </div>
          {/* Course */}
          <div className="w-full max-w-md">
            <div className="relative">
              <Select
                color="gray"
                className="w-full max-w-md"
                id="course"
                {...register("course")}
              >
                <option value="">-- دوره --</option>
                {courses.map((course) => (
                  <option key={course?._id} value={course?._id}>
                    {course?.name}
                  </option>
                ))}
              </Select>
              <HiChevronDown className="w-5 h-5 absolute left-2 top-2.5 pointer-events-none" />
            </div>
            {errors?.course && (
              <p className="text-red-500 text-xs mt-2">
                {errors?.course?.message}
              </p>
            )}
          </div>

          {/* ُStudent */}
          <div className="w-full max-w-md">
            <div className="relative">
              <Select
                color="gray"
                className="w-full max-w-md"
                id="student"
                {...register("student")}
              >
                <option value="">-- هنرجو --</option>
                {students.map((user) => (
                  <option key={user?._id} value={user?._id}>
                    {user?.name}
                  </option>
                ))}
              </Select>
              <HiChevronDown className="w-5 h-5 absolute left-2 top-2.5 pointer-events-none" />
            </div>
            {errors?.student && (
              <p className="text-red-500 text-xs mt-2">
                {errors?.student?.message}
              </p>
            )}
          </div>
        </div>
        <Button
          color="dark"
          outline
          type="submit"
          className="mt-8"
          disabled={!isValid || isCreatingArtWork || isEditingStudentWorks}
        >
          {isEditingStudentWorks || isCreatingArtWork ? <Loader /> : "تایید"}
        </Button>
      </ThemeProvider>
    </form>
  );
}

export default StudentWorksForm;
