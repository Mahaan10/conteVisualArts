import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteNewsApi } from "../services/newsService";

export default function useDeleteNews() {
  const queryClient = useQueryClient();

  const { isPending: isDeletingNews, mutateAsync: deleteNews } = useMutation({
    mutationFn: deleteNewsApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["news"],
      });
    },
    onError: (error) =>
      toast.error(error?.response?.data?.message || "حذف ناموفق"),
  });

  return { isDeletingNews, deleteNews };
}
