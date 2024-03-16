export const ImageCard = ({ photo, onClick }) => {
  return (
    <li>
      <img
        onClick={onClick}
        src={photo.urls.small}
        alt={photo.alt_description}
      />
    </li>
  );
};
