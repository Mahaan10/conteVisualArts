import http from "./httpService";

export default function getAllReviewsApi() {
  return http.get("/reviews").then(({ data }) => data.data);
}

export function createReviewApi({ courseId, newReview }) {
  return http
    .post(`/reviews/${courseId}/reviews`, newReview)
    .then(({ data }) => data.data);
}

//export function editReviewApi