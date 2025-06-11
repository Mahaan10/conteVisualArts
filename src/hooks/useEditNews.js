import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../context/useToastContext";
import { editNewsApi } from "../services/newsService";

export default function useEditNews() {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const { isPending: isEditingNews, mutateAsync: editNews } = useMutation({
    mutationFn: editNewsApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["news"],
      });
    },
    onError: (error) =>
      showToast("error", error?.response?.data?.message || "ویرایش انجام نشد"),
  });
  return { isEditingNews, editNews };
}
