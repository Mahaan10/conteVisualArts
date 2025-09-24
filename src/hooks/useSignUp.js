import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUserApi } from "../services/usersService";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useGetUser } from "../context/useGetUserContext";

export default function useSignUp() {
  const queryClient = useQueryClient();
  const { setToken } = useGetUser();

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

        toast.success(`${data?.data?.user?.name}، خوش آمدید`);
      },
      onError: (error) => {
        toast.error(
          error?.response?.data?.message || "ثبت نام با موفقیت انجام نشد"
        );
      },
    }
  );

  return { isCreatingUser, createNewUser };
}
