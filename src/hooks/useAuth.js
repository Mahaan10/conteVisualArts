import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../services/usersService";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/useToastContext";
import { useAuthUser } from "../context/useAuthContext";

export default function useAuth() {
  const {setUserId} = useAuthUser()
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
          setUserId(data?.data?.user?._id)
          if (data?.data?.user?.role === "admin") {
            navigate("/admin", { replace: true });
          } else {
            navigate("/home", { replace: true });
          }
        }

        showToast("success", `${data?.data?.user?.name}، خوش آمدید`);
      },
    });

  return { isLoggedInLoading, getLoggedIn };
}
