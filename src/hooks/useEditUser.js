import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editUserApi } from "../services/usersService";
import { useToast } from "../context/useToastContext";

export default function useEditUser(token) {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const { isPending: isUserEditing, mutateAsync: editUser } = useMutation({
    mutationFn: editUserApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user", token],
      });
    },
    onError: (error) => {
      showToast(
        "error",
        error?.response?.data?.message || "ویرایش اطلاعات موفقیت آمیز نبود"
      );
    },
  });

  return { isUserEditing, editUser };
}
