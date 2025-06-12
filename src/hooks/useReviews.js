import { useQuery } from "@tanstack/react-query";
import getAllReviewsApi from "../services/reviewsService";

export default function useReviews() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["reviews"],
    queryFn: getAllReviewsApi,
  });

  const reviews = data?.reviews || [];
  return { reviews, isLoading, isError, error };
}
