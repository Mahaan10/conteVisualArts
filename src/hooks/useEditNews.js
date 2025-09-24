import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { editNewsApi } from "../services/newsService";

export default function useEditNews() {
  const queryClient = useQueryClient();
 

  const { isPending: isEditingNews, mutateAsync: editNews } = useMutation({
    mutationFn: editNewsApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["news"],
      });
    },
    onError: (error) =>
      toast.error( error?.response?.data?.message || "ویرایش انجام نشد"),
  });
  return { isEditingNews, editNews };
}
