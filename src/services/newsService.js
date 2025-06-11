import http from "./httpService";

export default function getAllNewsApi() {
  return http.get("/news").then(({ data }) => data.data);
}

export function createNewNewsApi(newNews) {
  return http
    .post("/news", newNews, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(({ data }) => data.data);
}

export function editNewsApi({ newsId, newNews }) {
  return http
    .post(`/news/${newsId}`, newNews, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(({ data }) => data.data);
}

export function deleteNewsApi(newsId) {
  return http.delete(`/news/${newsId}`).then(({ data }) => data.data);
}
