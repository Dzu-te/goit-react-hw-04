import axios from "axios";

export const requestPhotos = async () => {
  const { data } = await axios.get(
    "https://api.unsplash.com/photos/?client_id=6INEhh2KvuOePKRcJXHr6UyJuAaPU1_-BJ04qeaHgBY"
  );
  return data;
}