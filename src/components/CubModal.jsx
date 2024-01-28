import { useState, useEffect } from "react";
import useModal from "../utils/useModal";
import { getMediumButtImage, getMetadata, getSeasonalCubImage } from "../utils/api";
import DownloadBar from "./DownloadBar";
import Traits from "./Traits";
import { useIsMobile } from "../utils/tools";

const ModalContent = ({
  butt: cub,
  buttMetadata: cubMetadata,
  buttImage: cubImage,
  isLoading,
  selectedType,
}) => {
  const isMobile = useIsMobile();

  const desktopLayout = (
    <div className="horizontalContainer">
      {isLoading ? (
        <div className="loading-container">
          <div className="loading"></div>
        </div>
      ) : (
        <img
          className={"buttModalImage fullRes"}
          src={cubImage}
          alt={`Lazy Butt #${cub.id}`}
        />
      )}
    </div>
  );

  const mobileLayout = (
    <div className="verticalContainer">
      {isLoading ? (
        <div className="loading-container">
          <div className="loading"></div>
        </div>
      ) : (
        <img
          className={`buttModalImage fullRes mobile`}
          src={cubImage}
          alt={`Lazy Butt #${cub.id}`}
        />
      )}
    </div>
  );

  return isMobile ? mobileLayout : desktopLayout;
};

// modal for displaying butt details and download button
const CubModal = ({ butt: cub, myLions }) => {
  const isMobile = useIsMobile();
  const { closeModal } = useModal();
  const [isLoading, setIsLoading] = useState(true);
  const [cubImage, setCubImage] = useState(null);
  const [buttMetadata, setButtMetadata] = useState(null);
  const [selectedType, setSelectedType] = useState("seasonal");

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    const targetElement = document.querySelector(".myButts");

    if (isMobile) {
      targetElement.classList.add("no-scroll");
    } else if (targetElement) {
      targetElement.classList.remove("no-scroll");
    }

    // Cleanup function: if the modal component is destroyed, ensure we remove the class
    return () => {
      if (targetElement) {
        targetElement.classList.remove("no-scroll");
      }
    };
  }, []);

  useEffect(() => {
    const fetchCubImage = async () => {
      const imageBlob = await getSeasonalCubImage(cub.id);
      const cubImage = URL.createObjectURL(imageBlob);
      setCubImage(cubImage);
      setIsLoading(false);
    };
    const fetchMetadata = async () => {
      const metadata = await getMetadata(cub.id);
      setButtMetadata(metadata);
    };
    fetchMetadata();
    fetchCubImage();
  }, [cub]);

  const handleModalClose = () => {
    closeModal();
  };

  return (
    <>
      <div className="buttModalOverlay"></div>
      <div className="buttModal">
        <DownloadBar
          butt={cub}
          cubImage={cubImage}
          setButtImage={setCubImage}
          setIsLoading={setIsLoading}
          isLoading={isLoading}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          myLions={myLions}
          type="cub"
        />
        <div className="buttModalContent">
          <div className="buttModalClose" onClick={handleModalClose}>
            <div className="buttModalCloseInner">x</div>
          </div>
          <div className={`buttModalTitle ${isMobile ? "mobile" : null}`}>
            Lazy Cub #{cub.id}
          </div>
          <ModalContent
            butt={cub}
            buttMetadata={buttMetadata}
            buttImage={cubImage}
            isLoading={isLoading}
            selectedType={selectedType}
          />
        </div>
      </div>
    </>
  );
};

export default CubModal;
