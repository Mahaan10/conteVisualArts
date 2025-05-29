import http from "./httpService";

export default function getAllCoursesApi() {
  return http.get("/courses").then(({ data }) => data.data);
}

export function getSingleCourseApi(id) {
  return http.get(`/courses/${id}`).then(({ data }) => data.data);
}

export function createReviewApi(newReview) {
  return http.post("/reviews", newReview).then(({ data }) => data.data);
}