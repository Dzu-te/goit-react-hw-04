import { useEffect } from "react";
import Modal from "react-modal";

export const ImageModal = ({ isOpen, closeModal, src, alt }) => {
  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);

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
