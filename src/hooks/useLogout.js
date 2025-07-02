import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { logoutApi } from "../services/usersService";
import { useToast } from "../context/useToastContext";
import { useGetUser } from "../context/useGetUserContext";

export default function useLogout() {
  const queryClient = useQueryClient();
  const { setToken } = useGetUser();
  const { showToast } = useToast();

  const { isPending: isLoggedOut, mutateAsync: logout } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.clear();
      Cookies.remove("token");
      setToken(null);
      showToast("success", "با موفقیت خارج شدید");
    },
    onError: (error) => {
      showToast(
        "error",
        error?.response?.data?.message || "عدم موفقیت در خروج از حساب"
      );
    },
  });

  return { isLoggedOut, logout };
}
