import { useState, useEffect, useRef } from "react";
import { createTheme, Textarea, ThemeProvider, Tooltip } from "flowbite-react";
import useCreateReview from "../hooks/useCreateReview";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import Loading, { Loader } from "./Loading";
import useSingleCourse from "../hooks/useSingleCourse";
import toast from "react-hot-toast";
import { useGetUser } from "../context/useGetUserContext";

const customTheme = createTheme({
  floatingLabel: {
    label: {
      default: {
        outlined: {
          sm: "right-1 left-auto dark:bg-gray-950 bg-whitesmoke cursor-text",
        },
      },
    },
  },
  textarea: {
    colors: {
      gray: "bg-transparent focus:ring-0 dark:bg-transparent dark:focus:ring-0",
    },
  },
});

const rates = ["خیلی بد", "بد", "متوسط", "خوب", "عالی"];
const MAX_LENGTH = 200;

const Comments = ({ onClose }) => {
  const { id } = useParams();
  const { createReview, isCreatingReview } = useCreateReview();
  const { course, error, isError, isLoading } = useSingleCourse(id);
  const {
    user,
    isLoading: isUserLoading,
    isError: isUserError,
    token,
  } = useGetUser();
  const [value, setValue] = useState(3);
  const toastShownRef = useRef(false);
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm({ mode: "onBlur" });

  useEffect(() => {
    if (isError || isUserError) {
      if (!toastShownRef.current) {
        toast.error(
          error?.response?.data?.message || "خطا در بارگذاری اطلاعات"
        );
        toastShownRef.current = true;
        onClose();
      }
    }
  }, [isError, isUserError, error, onClose]);

  useEffect(() => {
    if (!isLoading && !isUserLoading && !toastShownRef.current) {
      if (!token) {
        toast.error("برای ارسال دیدگاه لطفاً وارد حساب کاربری شوید.");
        toastShownRef.current = true;
        onClose();
      } else if (
        !course?.enrolledStudents?.some((student) => student === user?._id)
      ) {
        toast.error(
          "فقط هنرجویان ثبت‌نام‌ کرده در این دوره می‌توانند دیدگاه ثبت کنند."
        );
        toastShownRef.current = true;
        onClose();
      }
    }
  }, [token, course, user, isLoading, isUserLoading, onClose]);

  const onSubmit = async (data) => {
    const newComment = {
      rating: value,
      review: data?.review,
    };
    await createReview({ courseId: id, newReview: newComment });
    onClose();
  };

  if (isLoading || isUserLoading) return <Loading />;

  return (
    <form
      className="w-full max-w-md mx-auto p-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <label htmlFor="range" className="block mb-2 text-sm font-medium">
        امتیاز دهید:
        <span className="mx-2">{rates[value - 1]}</span>
      </label>

      <div className="relative h-6">
        <div className="absolute -bottom-[15.5px] w-full flex justify-between pointer-events-none px-2">
          {[1, 2, 3, 4, 5].map((num) => (
            <div key={num} className="relative pointer-events-auto">
              <Tooltip content={num} trigger="hover" placement="top">
                <span
                  className={`w-0.5 h-0.5 rounded-full block transition-transform ${
                    value == num ? "bg-gray-500 scale-125" : "bg-gray-400"
                  }`}
                />
              </Tooltip>
            </div>
          ))}
        </div>
      </div>

      <input
        id="range"
        type="range"
        min="1"
        max="5"
        step="1"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="w-full h-1 bg-gray-200 rounded-lg cursor-pointer dark:bg-gray-700 transition-discrete duration-300"
      />

      <div className="flex justify-between text-[10px] sm:text-xs text-gray-500 mt-2 mb-8">
        {rates.map((rate) => (
          <span key={rate}>{rate}</span>
        ))}
      </div>

      <div className="space-y-6">
        <ThemeProvider theme={customTheme}>
          <Textarea
            placeholder="توضیحات"
            name="review"
            rows={4}
            className="resize-none"
            maxLength={MAX_LENGTH}
            {...register("review", {
              required: "لطفا توضیحات را وارد کنید",
              maxLength: {
                value: MAX_LENGTH,
                message: `توضیحات نمی تواند بیشتر از ${MAX_LENGTH} کاراکتر باشد`,
              },
            })}
          />
          {errors.review && (
            <p className="text-red-500 text-sm">{errors.review.message}</p>
          )}
        </ThemeProvider>
      </div>

      <button
        type="submit"
        disabled={isCreatingReview || !isValid}
        className="w-full mt-6 rounded-xl bg-almond-cookie hover:bg-golden-sand dark:bg-dark-cerulean dark:hover:bg-purple-plumeria py-3 cursor-pointer text-sm transition-all duration-300"
      >
        {isCreatingReview ? <Loader /> : "ثبت دیدگاه"}
      </button>
    </form>
  );
};

export default Comments;
