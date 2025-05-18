import { useQuery } from "@tanstack/react-query";
import getAllNewsApi from "../services/newsService";

export default function useNews() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["news"],
    queryFn: getAllNewsApi,
  });

  const news = data?.news || [];

  return { news, isLoading, isError, error };
}
