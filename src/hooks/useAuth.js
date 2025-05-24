import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../services/usersService";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/useToastContext";

export default function useAuth() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { isPending: isLoggedInLoading, mutateAsync: getLoggedIn } =
    useMutation({
      mutationFn: loginApi,
      onSuccess: (data) => {
        Cookies.set("token", data?.token, {
          expires: 30,
          secure: true,
          sameSite: "Strict",
        });

        if (data?.token) {
          navigate("/home", { replace: true });
        }

        showToast("success", `${data?.data?.user?.name}، خوش آمدید`);
      },
    });

  return { isLoggedInLoading, getLoggedIn };
}
