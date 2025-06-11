import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../context/useToastContext";
import { editArtWorksApi } from "../services/studentsWorksService";

export default function useEditStudentWorks() {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const { isPending: isEditingStudentWorks, mutateAsync: editArtWork } =
    useMutation({
      mutationFn: editArtWorksApi,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["studentWorks"],
        });
      },
      onError: (error) =>
        showToast(
          "error",
          error?.response?.data?.message || "ویرایش انجام نشد"
        ),
    });
  return { isEditingStudentWorks, editArtWork };
}
