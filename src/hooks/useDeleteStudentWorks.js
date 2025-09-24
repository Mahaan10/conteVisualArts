import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteArtWorkApi } from "../services/studentsWorksService";

export default function useDeleteStudentWorks() {
  const queryClient = useQueryClient();

  const { isPending: isDeletingArtWork, mutateAsync: deleteArtWork } =
    useMutation({
      mutationFn: deleteArtWorkApi,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["studentWorks"],
        });
      },
      onError: (error) =>
        toast.error(error?.response?.data?.message || "حذف ناموفق"),
    });

  return { isDeletingArtWork, deleteArtWork };
}
