import http from "./httpService";

export default function getAllUsersApi() {
  return http.get("/users").then(({ data }) => data.data);
}

export function sendOtp(data) {
  return http.post("/users/send-otp", data).then(({ data }) => data.data);
}

export function createUserApi(data) {
  return http.post("/users/signup", data).then(({ data }) => data.data);
}

export function loginApi(data) {
  return http.post("/users/login", data).then(({ data }) => data.data);
}
