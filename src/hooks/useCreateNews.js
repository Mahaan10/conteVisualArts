import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createNewNewsApi } from "../services/newsService";

export default function useCreateNews() {
  const queryClient = useQueryClient();

  const { isPending: isCreatingNews, mutateAsync: createNews } = useMutation({
    mutationFn: createNewNewsApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["news"],
      });
    },
    onError: (error) =>
      toast.error(error?.response?.data?.message || "عدم ایجاد رویداد جدید"),
  });

  return { createNews, isCreatingNews };
}
