import "./App.css";
import { SearchBar } from "./SearchBar/SearchBar";
import { useEffect, useState } from "react";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Loader } from "./Loader/Loader";
import { ErrorMessage } from "./ErrorMessage/ErrorMessage.jsx";
import {
  requestPhotos,
  requestPhotosBySearchQuery,
  requestNextPhotos,
} from "../services/api";
import { LoadMoreBtn } from "./LoadMoreBtn/LoadMoreBtn";
import { ImageModal } from "./ImageModal/ImageModal";

export default function App() {
  const [photos, setPhotos] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState(null);
  const [moreAvailable, setMoreAvailable] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [page, setPage] = useState(1);
  const perPage = 10;

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setIsError(false);
        const data = await requestPhotos();
        setPhotos(data);
        setMoreAvailable(true);
      } catch (error) {
        setIsError(true);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    if (!searchQuery) {
      fetchData();
    }
  }, [searchQuery]);

  useEffect(() => {
    if (searchQuery === null) return;

    async function fetchDataQuery() {
      try {
        setLoading(true);
        setIsError(false);
        const data = await requestPhotosBySearchQuery(searchQuery);
        setPhotos(data.results);
        setMoreAvailable(true);
      } catch (error) {
        setIsError(true);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchDataQuery();
  }, [searchQuery]);

  const onSetSearchQuery = async (searchQuery) => {
    setSearchQuery(searchQuery);
  };

  const loadMorePhotos = async () => {
    try {
      setLoading(true);
      setIsError(false);
      const newData = await requestNextPhotos();
      setPhotos((prevPhotos) => [...prevPhotos, ...newData]);
      setMoreAvailable(!!newData.length);
    } catch (error) {
      setIsError(true);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (photo) => {
    setSelectedPhoto(photo);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
    setModalIsOpen(false);
  };

  return (
    <div>
      <h1>Search photo gallery</h1>
      <SearchBar onSetSearchQuery={onSetSearchQuery} />
      {isError && <ErrorMessage error={error} />}
      {loading && <Loader />}
      <ImageGallery photos={photos} openModal={openModal} />
      {moreAvailable && photos?.length > 0 && (
        <LoadMoreBtn loadMorePhotos={loadMorePhotos} />
      )}
      <ImageModal
        isOpen={modalIsOpen}
        closeModal={closeModal}
        photo={selectedPhoto}
      />
    </div>
  );
}
