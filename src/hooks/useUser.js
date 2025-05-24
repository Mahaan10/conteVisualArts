import { useQuery } from "@tanstack/react-query";
import { getUserApi } from "../services/usersService";

export default function useUser(userId) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserApi(userId),
    enabled: !!userId,
    retry: false
  });

  const user = data?.user || {};
  return { user, isLoading, isError, error };
}
