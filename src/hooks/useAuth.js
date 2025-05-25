import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../services/usersService";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/useToastContext";
import { useGetUser } from "../context/useGetUserContext";

export default function useAuth() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { setToken } = useGetUser();
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
          setToken(data?.token);
          if (data?.data?.user?.role === "admin") {
            navigate("/admin", { replace: true });
          } else {
            navigate("/", { replace: true });
          }
        }

        showToast("success", `${data?.data?.user?.name}، خوش آمدید`);
      },
    });

  return { isLoggedInLoading, getLoggedIn };
}
