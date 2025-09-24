import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteUserApi } from "../services/usersService";
import Cookies from "js-cookie";

export default function useDeleteUser() {
  const queryClient = useQueryClient();

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
      toast.error(error?.response?.data?.message || "حذف ناموفق"),
  });

  return { isDeletingUser, deleteUser };
}
