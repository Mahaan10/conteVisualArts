import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { editArtWorksApi } from "../services/studentsWorksService";

export default function useEditStudentWorks() {
  const queryClient = useQueryClient();

  const { isPending: isEditingStudentWorks, mutateAsync: editArtWork } =
    useMutation({
      mutationFn: editArtWorksApi,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["studentWorks"],
        });
      },
      onError: (error) =>
        toast.error(error?.response?.data?.message || "ویرایش انجام نشد"),
    });
  return { isEditingStudentWorks, editArtWork };
}
