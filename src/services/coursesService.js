import http from "./httpService";

export default function getAllCoursesApi() {
  return http.get("/courses").then(({ data }) => data.data);
}

export function getSingleCourseApi(slug) {
  return http.get(`/courses/${slug}`).then(({ data }) => data.data);
}
