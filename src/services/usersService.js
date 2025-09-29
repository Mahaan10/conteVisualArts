import http from "./httpService";

export default function getAllUsersApi() {
  return http.get("/users").then(({ data }) => data.data);
}

export function createUserApi(data) {
  return http.post("/users/signup", data).then(({ data }) => data);
}

export function loginApi(data) {
  return http.post("/users/login", data).then(({ data }) => data);
}

export function getUserApi(token) {
  return http
    .get("/users/me", { headers: { Authorization: `Bearer ${token}` } })
    .then(({ data }) => data.data);
}

export function logoutApi() {
  return http.post("/users/logout").then(({ data }) => data.data);
}

export function editUserApi({ userId, updatedUser }) {
  return http
    .patch(`/users/${userId}`, updatedUser)
    .then(({ data }) => data.data);
}

export function deleteUserApi(userId) {
  return http.delete(`/users/${userId}`).then(({ data }) => data.data);
}
