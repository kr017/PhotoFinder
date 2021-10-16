import { axiosClient } from "./apiClient";

export function getCurrentUser() {
  return axiosClient.get("me");
}

//
export function getPhotos(data) {
  let count = data.count;
  let currentPage = data.page;
  return axiosClient.get(`photos?per_page=${count}&page=${currentPage}`);
}

export function getPhoto(data) {
  return axiosClient.get("/photos/" + data.id);
}

export function searchPhotos(data) {
  let color = data.color ? data.color : null;
  let orientation = data.orientation ? data.orientation : null;
  let query = data.query ? data.query : null;
  let url = `search/photos?query=${query}`;
  if (color) {
    url = url + `&color=${color}`;
  }
  if (orientation) {
    url = url + `&orientation=${orientation}`;
  }

  return axiosClient.get(url);
}

// &per_page=${count}&page=${currentPage}
