export const ImageCard = ({ photo }) => {
  return (
    <li>
      <img
        width={250}
        height={200}
        src={photo.urls.small}
        alt={photo.alt_description}
      />
    </li>
  );
};
