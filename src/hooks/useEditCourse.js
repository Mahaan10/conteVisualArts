import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editCourseApi } from "../services/coursesService";

export default function useEditCourse() {
  const queryClient = useQueryClient();

  const { isPending: isEditingCourse, mutateAsync: editCourse } = useMutation({
    mutationFn: editCourseApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["courses"],
      });
    },
    /* onError: (error) =>
      toast.error(error?.response?.data?.message || "ویرایش انجام نشد"), */
  });
  return { isEditingCourse, editCourse };
}
