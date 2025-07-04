import { useQuery } from "@tanstack/react-query";
import { getSingleNewsApi } from "../services/newsService";

export default function useSingleNews(id) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["news", id],
    queryFn: () => getSingleNewsApi(id),
    enabled: !!id
  });

  const news = data?.news || {};

  return { news, isLoading, isError, error };
}
