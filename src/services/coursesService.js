import http from "./httpService";

export default function getAllCoursesApi() {
  return http.get("/courses").then(({ data }) => data.data);
}
