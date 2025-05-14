import { useQuery } from "@tanstack/react-query";
import getAllUsersApi from "../services/usersService";

export default function useUsers() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsersApi,
  });

  const users = data?.users || [];
  return { users, isLoading, isError, error };
}
