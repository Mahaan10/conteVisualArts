import http from "./httpService";

export default function getAllReviewsApi() {
  return http.get("/reviews").then(({ data }) => data.data);
}

export function createReviewApi({ courseId, newReview }) {
  return http
    .post(`/reviews/${courseId}/reviews`, newReview)
    .then(({ data }) => data.data);
}

export function editReviewApi({ reviewId, newReview }) {
  return http
    .patch(`/reviews/${reviewId}`, newReview)
    .then(({ data }) => data.data);
}

export function deleteReviewApi(reviewId) {
  return http.delete(`/reviews/${reviewId}`).then(({ data }) => data.data);
}
