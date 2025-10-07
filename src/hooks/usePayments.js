import { useQuery } from "@tanstack/react-query";
import { getPaymentsApi } from "../services/paymentsService";

export default function usePayments() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["payments"],
    queryFn: getPaymentsApi,
  });

  const paymentsData = data?.payments || [];

  return { paymentsData, isLoading, isError, error };
}
