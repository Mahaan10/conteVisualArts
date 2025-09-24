import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createNewArtWorksApi } from "../services/studentsWorksService";

export default function useCreateStudentWorks() {
  const queryClient = useQueryClient();

  const { isPending: isCreatingArtWork, mutateAsync: createArtWork } =
    useMutation({
      mutationFn: createNewArtWorksApi,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["studentWorks"],
        });
      },
      onError: (error) =>
        toast.error(error?.response?.data?.message || "عدم ایجاد اثر جدید"),
    });

  return { createArtWork, isCreatingArtWork };
}
