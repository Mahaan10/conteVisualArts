import http from "./httpService";

export default function getAllUsersApi() {
  return http.get("/users").then(({ data }) => data.data);
}
