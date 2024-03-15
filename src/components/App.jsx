import "./App.css";
import { SearchBar } from "./SearchBar/SearchBar";
import { useEffect, useState } from "react";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Loader } from "./Loader/Loader";
import { ErrorMessage } from "./ErrorMessage/ErrorMessage.jsx";
import { requestPhotos } from "../services/api";

export default function App() {
  const [photos, setPhotos] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setIsError(false);
        const data = await requestPhotos();
        setPhotos(data);
      } catch (error) {
        setIsError(true);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  return (
    <div>
      <h1>Search photo gallery</h1>
      {isError && <ErrorMessage error={error} />}
      {loading && <Loader />}
      <ImageGallery photos={photos} />
      <SearchBar />
    </div>
  );
}
