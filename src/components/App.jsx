import "./App.css";
import { SearchBar } from "./SearchBar/SearchBar";
import { useState } from "react";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Loader } from "./Loader/Loader";
import { ErrorMessage } from "./ErrorMessage/ErrorMessage.jsx";
import { LIMIT, requestPhotos } from "../services/api";
import { LoadMoreBtn } from "./LoadMoreBtn/LoadMoreBtn";
import { ImageModal } from "./ImageModal/ImageModal";

export default function App() {
  const [photos, setPhotos] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState(null);
  const [moreAvailable, setMoreAvailable] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [page, setPage] = useState(1);
  const fetchData = async (query, page) => {
    try {
      setLoading(true);
      setError("");
      const data = await requestPhotos(query, page);
      if (query !== searchQuery) {
        setPhotos(data);
      } else {
        setPhotos((prevState) => [...prevState, ...data]);
      }

      setMoreAvailable(data.length === LIMIT);
    } catch (error) {
      setError(error.message);
      setPhotos(null);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onSetSearchQuery = (newQuery) => {
    setSearchQuery(newQuery);
    fetchData(newQuery, page);
  };

  const openModal = (photo) => {
    setSelectedPhoto(photo);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
    setModalIsOpen(false);
  };

  const loadMorePhotos = () => {
    fetchData(searchQuery, page + 1);
    setPage((prevState) => prevState + 1);
  };

  return (
    <div>
      <h1>Search photo gallery</h1>

      <SearchBar onSetSearchQuery={onSetSearchQuery} />
      {error && <ErrorMessage error={error} />}
      {loading && <Loader />}
      <ImageGallery photos={photos} openModal={openModal} />
      {moreAvailable && photos?.length > 0 && (
        <LoadMoreBtn loadMorePhotos={loadMorePhotos} />
      )}
      <ImageModal
        isOpen={modalIsOpen}
        closeModal={closeModal}
        src={selectedPhoto?.urls.regular}
        alt={selectedPhoto?.alt_description}
      />
    </div>
  );
}
