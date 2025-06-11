import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../context/useToastContext";
import { deleteNewsApi } from "../services/newsService";

export default function useDeleteNews() {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const { isPending: isDeletingNews, mutateAsync: deleteNews } = useMutation({
    mutationFn: deleteNewsApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["news"],
      });
    },
    onError: (error) =>
      showToast("error", error?.response?.data?.message || "حذف ناموفق"),
  });

  return { isDeletingNews, deleteNews };
}
