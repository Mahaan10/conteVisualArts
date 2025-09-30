import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addUserToCourseApi } from "../services/usersService";
import toast from "react-hot-toast";

export default function useAddUserToAvailableCourse() {
  const queryClient = useQueryClient();

  const {
    isPending: isAddingUserToCourse,
    mutateAsync: addUserToAvailableCourse,
  } = useMutation({
    mutationFn: addUserToCourseApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["courses", "user"],
      });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "عدم اضافه شدن دوره جدید");
    },
  });

  return { isAddingUserToCourse, addUserToAvailableCourse };
}
