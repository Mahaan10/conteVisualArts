import http from "./httpService";

export default function getAllStudentsWorksApi() {
  return http.get("studentWorks").then(({ data }) => data.data);
}
