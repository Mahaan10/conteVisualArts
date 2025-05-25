import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUserApi } from "../services/usersService";
import { useToast } from "../context/useToastContext";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useGetUser } from "../context/useGetUserContext";

export default function useSignUp() {
  const queryClient = useQueryClient();
  const { setToken } = useGetUser();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const { isPending: isCreatingUser, mutateAsync: createNewUser } = useMutation(
    {
      mutationFn: createUserApi,
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: ["users"],
        });
        Cookies.set("token", data?.token, {
          expires: 30,
          secure: true,
          sameSite: "Strict",
        });
        if (data?.token) {
          setToken(data?.token);
          navigate("/", { replace: true });
        }

        showToast("success", `${data?.data?.user?.name}، خوش آمدید`);
      },
      onError: (error) => {
        showToast(
          "error",
          error?.response?.data?.message || "ثبت نام با موفقیت انجام نشد"
        );
      },
    }
  );

  return { isCreatingUser, createNewUser };
}
