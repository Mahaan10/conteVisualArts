import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editUserApi } from "../services/usersService";
import toast from "react-hot-toast";

export default function useEditUser() {
  const queryClient = useQueryClient();

  const { isPending: isUserEditing, mutateAsync: editUser } = useMutation({
    mutationFn: editUserApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      toast.success("اطلاعات با موفقیت ویرایش شد"); 
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "ویرایش اطلاعات موفقیت آمیز نبود"
      );
    },
  });

  return { isUserEditing, editUser };
}
