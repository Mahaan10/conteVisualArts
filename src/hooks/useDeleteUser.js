import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../context/useToastContext";
import { deleteUserApi } from "../services/usersService";
import Cookies from "js-cookie";

export default function useDeleteUser() {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const { isPending: isDeletingUser, mutateAsync: deleteUser } = useMutation({
    mutationFn: deleteUserApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      queryClient.removeQueries();
      Cookies.remove("token");
    },
    onError: (error) =>
      showToast("error", error?.response?.data?.message || "حذف ناموفق"),
  });

  return { isDeletingUser, deleteUser };
}
