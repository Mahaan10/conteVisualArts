import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUserApi } from "../services/usersService";
import { useToast } from "../context/useToastContext";

export default function useSignUp() {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const { isPending: isCreatingUser, mutateAsync: createNewUser } = useMutation(
    {
      mutationFn: createUserApi,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["users"],
        });
      },
      onError: (error) => {
        showToast("error", error?.response?.data?.message || "ثبت نام با موفقیت انجام نشد");
      },
    }
  );

  return { isCreatingUser, createNewUser };
}
