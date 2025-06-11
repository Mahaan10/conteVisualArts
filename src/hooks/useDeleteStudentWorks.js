import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../context/useToastContext";
import { deleteArtWorkApi } from "../services/studentsWorksService";

export default function useDeleteStudentWorks() {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const { isPending: isDeletingArtWork, mutateAsync: deleteArtWork } =
    useMutation({
      mutationFn: deleteArtWorkApi,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["studentWorks"],
        });
      },
      onError: (error) =>
        showToast("error", error?.response?.data?.message || "حذف ناموفق"),
    });

  return { isDeletingArtWork, deleteArtWork };
}
