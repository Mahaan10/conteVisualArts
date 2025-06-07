import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editCourseApi } from "../services/coursesService";
import { useToast } from "../context/useToastContext";

export default function useEditCourse() {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const { isPending: isEditingCourse, mutateAsync: editCourse } = useMutation({
    mutationFn: editCourseApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["courses"],
      });
    },
    onError: (error) =>
      showToast("error", error?.response?.data?.message || "ویرایش انجام نشد"),
  });
  return { isEditingCourse, editCourse };
}
