import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../context/useToastContext";
import { createNewArtWorksApi } from "../services/studentsWorksService";

export default function useCreateStudentWorks() {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const { isPending: isCreatingArtWork, mutateAsync: createArtWork } =
    useMutation({
      mutationFn: createNewArtWorksApi,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["studentWorks"],
        });
      },
      onError: (error) =>
        showToast(
          "error",
          error?.response?.data?.message || "عدم ایجاد اثر جدید"
        ),
    });

  return { createArtWork, isCreatingArtWork };
}
