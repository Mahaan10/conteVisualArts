import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../context/useToastContext";
import requestPaymentApi from "../services/paymentsService";

export default function useCreatePayment() {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const { isPending: isCreatingPayment, mutateAsync: createPayment } =
    useMutation({
      mutationFn: requestPaymentApi,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["courses", "payments"],
        });
      },
      onError: (error) => {
        showToast(
          "error",
          error?.response?.data?.message ||
            "مشکلی در ارسال لینک پرداخت وجود دارد"
        );
      },
    });

  return { isCreatingPayment, createPayment };
}
