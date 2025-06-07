import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCourseApi } from "../services/coursesService";
import { useToast } from "../context/useToastContext";

export default function useDeleteCourse() {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const { isPending: isDeletingCourse, mutateAsync: deleteCourse } =
    useMutation({
      mutationFn: deleteCourseApi,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["courses"],
        });
      },
      onError: (error) =>
        showToast("error", error?.response?.data?.message || "حذف ناموفق"),
    });

  return { isDeletingCourse, deleteCourse };
}
