import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { logoutApi } from "../services/usersService";
import toast from "react-hot-toast";
import { useGetUser } from "../context/useGetUserContext";

export default function useLogout() {
  const queryClient = useQueryClient();
  const { setToken } = useGetUser();

  const { isPending: isLoggedOut, mutateAsync: logout } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.clear();
      Cookies.remove("token");
      setToken(null);
      toast.success("با موفقیت خارج شدید");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "عدم موفقیت در خروج از حساب"
      );
    },
  });

  return { isLoggedOut, logout };
}
