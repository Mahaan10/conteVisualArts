import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { logoutApi } from "../services/usersService";
import toast from "react-hot-toast";

export default function useLogout(setToken) {
  const queryClient = useQueryClient();

  const { isPending: isLoggedOut, mutateAsync: logout } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.clear();
      Cookies.remove("token");
      setToken && setToken(null); 
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
