import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCourseApi } from "../services/coursesService";
import toast from "react-hot-toast";

export default function useDeleteCourse() {
  const queryClient = useQueryClient();

  const { isPending: isDeletingCourse, mutateAsync: deleteCourse } =
    useMutation({
      mutationFn: deleteCourseApi,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["courses"],
        });
      },
      onError: (error) =>
        toast.error(error?.response?.data?.message || "حذف ناموفق"),
    });

  return { isDeletingCourse, deleteCourse };
}
