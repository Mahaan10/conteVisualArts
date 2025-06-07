import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewCourseApi } from "../services/coursesService";
import { useToast } from "../context/useToastContext";

export default function useCreateCourse() {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const { isPending: isCreatingCourse, mutateAsync: createCourse } =
    useMutation({
      mutationFn: createNewCourseApi,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["courses"],
        });
      },
      onError: (error) =>
        showToast(
          "error",
          error?.response?.data?.message || "عدم ایجاد دوره جدید"
        ),
    });

  return { createCourse, isCreatingCourse };
}
