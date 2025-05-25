import { useQuery } from "@tanstack/react-query";
import { getUserApi } from "../services/usersService";

export default function useUser(token) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["user", token],
    queryFn: () => getUserApi(token),
    enabled: !!token,
    retry: false,
  });

  const user = data?.user || {};
  return { user, isLoading, isError, error };
}
