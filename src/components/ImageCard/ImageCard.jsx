export const ImageCard = ({ photo, onClick }) => {
  const { alt, src } = photo;
  return (
    <li>
      <img onClick={onClick} src={src} alt={alt} />
    </li>
  );
};
