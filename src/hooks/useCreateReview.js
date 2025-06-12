import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../context/useToastContext";
import { createReviewApi } from "../services/reviewsService";

export default function useCreateReview() {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
 
  const { isPending: isCreatingReview, mutateAsync: createReview } = useMutation({
      mutationFn: createReviewApi,
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: ["course", data?.course],
        });
        showToast("success", "کامنت با موفقیت ارسال شد");
      },
      onError: (error) => {
          if (error?.status === 400) {
            showToast("error", error?.response?.data?.message || "شما یکبار کامنت گذاشته اید")
          } else {
            showToast("error", error?.response?.data?.message || "کامنت با موفقیت ارسال نشد")
          }
        }
      },
    );

  return { isCreatingReview, createReview };
}
