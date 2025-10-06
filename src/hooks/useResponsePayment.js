import { useQuery } from "@tanstack/react-query";
import { responsePaymentApi } from "../services/paymentsService";

export default function usePaymentResponse(authority) {
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["payment"],
    queryFn: () => responsePaymentApi(authority),
    enabled: !!authority,
  });

  const paymentData = data || {};

  return { paymentData, isLoading, isError, error };
}
