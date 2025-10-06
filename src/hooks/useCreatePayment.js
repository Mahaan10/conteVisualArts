import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import requestPaymentApi from "../services/paymentsService";

export default function useCreatePayment() {
  //const queryClient = useQueryClient();

  const { isPending: isCreatingPayment, mutateAsync: createPayment } =
    useMutation({
      mutationFn: requestPaymentApi,
      onSuccess: (data) => {
        toast.success("درخواست پرداخت با موفقیت ارسال شد");
        return data;
        /* queryClient.invalidateQueries({
          queryKey: ["courses", "payments"],
        }); */
      },
    });

  return { isCreatingPayment, createPayment };
}
