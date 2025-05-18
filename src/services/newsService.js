import http from "./httpService";

export default function getAllNewsApi() {
  return http.get("/news").then(({ data }) => data.data);
}
