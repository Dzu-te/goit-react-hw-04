import { ImageCard } from "../ImageCard/ImageCard";
import styles from "./ImageGallery.module.css";

export const ImageGallery = ({ photos, openModal }) => {
  const handleImageClick = (photo) => {
    openModal(photo);
  };
  return (
    <ul className={styles.imageGalleryList}>
      {photos != null &&
        Array.isArray(photos) &&
        photos.map((photo) => {
          return (
            <ImageCard
              key={photo.id}
              photo={photo}
              onClick={() => handleImageClick(photo)}
            />
          );
        })}
    </ul>
  );
};
