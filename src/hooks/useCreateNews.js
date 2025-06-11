import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../context/useToastContext";
import { createNewNewsApi } from "../services/newsService";

export default function useCreateNews() {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const { isPending: isCreatingNews, mutateAsync: createNews } = useMutation({
    mutationFn: createNewNewsApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["news"],
      });
    },
    onError: (error) =>
      showToast(
        "error",
        error?.response?.data?.message || "عدم ایجاد رویداد جدید"
      ),
  });

  return { createNews, isCreatingNews };
}
