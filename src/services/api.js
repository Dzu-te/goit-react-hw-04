import axios from "axios";
const clientId = "6INEhh2KvuOePKRcJXHr6UyJuAaPU1_-BJ04qeaHgBY"
export const requestPhotos = async () => {
  const { data } = await axios.get(
    `https://api.unsplash.com/photos/?client_id=${clientId}`
  );
  return data;
}

export const requestPhotosBySearchQuery = async (query) => {
  const { data } = await axios.get(
    `https://api.unsplash.com/search/photos/?query=${query}&client_id=${clientId}`
  );
  return data;
}

export const requestNextPhotos = async (page = 1, perPage = 10) => {
  const { data } = await axios.get(
    `https://api.unsplash.com/photos/?client_id=${clientId}&page=${page}&per_page=${perPage}`
  );
  return data;
}