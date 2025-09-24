import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import requestPaymentApi from "../services/paymentsService";

export default function useCreatePayment() {
  const queryClient = useQueryClient();

  const { isPending: isCreatingPayment, mutateAsync: createPayment } =
    useMutation({
      mutationFn: requestPaymentApi,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["courses", "payments"],
        });
      },
      onError: (error) => {
        toast.error(
          error?.response?.data?.message ||
            "مشکلی در ارسال لینک پرداخت وجود دارد"
        );
      },
    });

  return { isCreatingPayment, createPayment };
}
