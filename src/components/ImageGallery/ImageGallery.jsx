import { ImageCard } from "../ImageCard/ImageCard";

export const ImageGallery = ({ photos }) => {
  return (
    <ul>
      {photos != null &&
        Array.isArray(photos) &&
        photos.map((photo) => {
          return <ImageCard key={photo.id} photo={photo} />;
        })}
    </ul>
  );
};
