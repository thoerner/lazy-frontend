import { useState } from "react";
import ModalContext from "../contexts/ModalContext";
import CubModal from "./CubModal.jsx";

const LoadingSpinner = () => {
  return (
    <div className="loading-message">
      <div className="loading"></div>
    </div>
  );
};

// card for displaying butt image and butt number
const CubCard = ({ butt, buttImage, myLions, imageLoading }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleButtClick = () => {
    openModal();
  };

  return (
    <ModalContext.Provider value={{ isModalOpen, openModal, closeModal }}>
      {isModalOpen && (
        <CubModal butt={butt} buttImage={buttImage} myLions={myLions} />
      )}
      <div className="buttCard">
        <i
          className="fas fa-butt"
          style={{ fontSize: "100px", color: "white" }}
        ></i>
        <div className="buttCardTitle">Lazy Cub #{butt.id}</div>
        <div style={{ maxWidth: "250x", maxHeight: "250px" }}>
          <img
            src={buttImage}
            alt="Lazy Cubs"
            style={{ maxWidth: "250px", maxHeight: "250px" }}
            onClick={handleButtClick}
          />
          {imageLoading && <>Loading</>}
        </div>
      </div>
    </ModalContext.Provider>
  );
};

export default CubCard;
