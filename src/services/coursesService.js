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

export function createNewCourseApi(newCourse) {
  return http
    .post("/courses", newCourse, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(({ data }) => data.data);
}

export function editCourseApi({ courseId, newCourse }) {
  return http
    .patch(`/courses/${courseId}`, newCourse, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(({ data }) => data.data);
}

export function deleteCourseApi(courseId) {
  return http.delete(`/courses/${courseId}`).then(({ data }) => data.data);
}
