import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUserFromCourseApi } from "../services/usersService";
import toast from "react-hot-toast";

export default function useDeleteUserFromCourse() {
  const queryClient = useQueryClient();

  const {
    isPending: isDeletingUserFromCourse,
    mutateAsync: deleteUserFromCourse,
  } = useMutation({
    mutationFn: deleteUserFromCourseApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user", "courses"],
      });
    },
    onError: (error) =>
      toast.error(error?.response?.data?.message || "حذف ناموفق"),
  });

  return { isDeletingUserFromCourse, deleteUserFromCourse };
}
