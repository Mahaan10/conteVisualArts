import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteReviewApi } from "../services/reviewsService";
import toast from "react-hot-toast";

export default function useDeleteReview() {
  const queryClient = useQueryClient();

  const { isPending: isDeletingReview, mutateAsync: deleteReview } =
    useMutation({
      mutationFn: deleteReviewApi,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["reviews"],
        });
      },
      onError: (error) =>
        toast.error(error?.response?.data?.message || "حذف ناموفق"),
    });

  return { isDeletingReview, deleteReview };
}
