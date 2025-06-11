import http from "./httpService";

export default function getAllStudentsWorksApi() {
  return http.get("/studentWorks").then(({ data }) => data.data);
}

export function createNewArtWorksApi(newArtWork) {
  return http
    .post("/studentWorks", newArtWork, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(({ data }) => data.data);
}

export function editArtWorksApi({ artWorkId, newArtWork }) {
  return http
    .post(`/studentWorks/${artWorkId}`, newArtWork, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(({ data }) => data.data);
}

export function deleteArtWorkApi(artWorkId) {
  return http
    .delete(`/studentWorks/${artWorkId}`)
    .then(({ data }) => data.data);
}
