import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createReviewApi } from "../services/reviewsService";

export default function useCreateReview() {
  const queryClient = useQueryClient();

  const { isPending: isCreatingReview, mutateAsync: createReview } =
    useMutation({
      mutationFn: createReviewApi,
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: ["course", data?.course],
        });
        toast.success("کامنت با موفقیت ارسال شد");
      },
      onError: (error) => {
        if (error?.status === 400) {
          toast.error(
            error?.response?.data?.message || "شما یکبار کامنت گذاشته اید"
          );
        } else {
          toast.error(
            error?.response?.data?.message || "کامنت با موفقیت ارسال نشد"
          );
        }
      },
    });

  return { isCreatingReview, createReview };
}
