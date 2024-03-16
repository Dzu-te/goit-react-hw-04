import Modal from "react-modal";
Modal.setAppElement("#root");

export const ImageModal = ({ isOpen, closeModal, photo }) => {
  if (!photo) {
    return null;
  }
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Image Modal"
    >
      <button onClick={closeModal}>Close Modal</button>
      <img src={photo.urls.regular} alt={photo.alt_description} />
    </Modal>
  );
};
