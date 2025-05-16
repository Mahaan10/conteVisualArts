import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../services/usersService";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/useToastContext";

export default function useAuth() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { isPending: isLoggedIn, mutateAsync: getLoggedIn } = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      Cookies.set("token", data?.token, {
        expires: 30,
        secure: true,
        sameSite: "Strict",
      });

      console.log(data)

      if (data.token) {
        navigate("/home", { replace: true });
      } else {
        navigate("/courses", { replace: true });
      }

      showToast("success", `${data?.data?.user?.name}، خوش آمدید`);
    },
    onError: (error) => {
      showToast("error", error?.response?.data?.message || error?.message);
    },
  });

  return { isLoggedIn, getLoggedIn };
}
