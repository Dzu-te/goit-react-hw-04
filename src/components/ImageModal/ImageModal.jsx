import Modal from "react-modal";
Modal.setAppElement("#root");

export const ImageModal = ({ isOpen, closeModal, src, alt }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Image Modal"
    >
      <button onClick={closeModal}>Close Modal</button>
      <img src={src} alt={alt} />
    </Modal>
  );
};
