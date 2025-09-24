import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewCourseApi } from "../services/coursesService";
import toast from "react-hot-toast";

export default function useCreateCourse() {
  const queryClient = useQueryClient();

  const { isPending: isCreatingCourse, mutateAsync: createCourse } =
    useMutation({
      mutationFn: createNewCourseApi,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["courses"],
        });
      },
      onError: (error) =>
        toast.error(error?.response?.data?.message || "عدم ایجاد دوره جدید"),
    });

  return { createCourse, isCreatingCourse };
}
