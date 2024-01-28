import { useState, useEffect } from "react";
import useModal from "../utils/useModal";
import { getMediumButtImage, getMetadata, getSeasonalCubImage } from "../utils/api";
import DownloadBar from "./DownloadBar";
import Traits from "./Traits";
import { useIsMobile } from "../utils/tools";

const ModalContent = ({
  butt,
  buttMetadata,
  buttImage,
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
          className={
            ["full-body", "transparent"].includes(selectedType)
              ? "buttModalImage fullBody"
              : selectedType === "rex-roar"
              ? "buttModalImage rexRoar"
              : selectedType === "medium"
              ? "buttModalImage medium"
              : "buttModalImage fullRes"
          }
          src={buttImage}
          alt={`Lazy Butt #${butt.id}`}
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
          className={`${
            ["full-body", "transparent"].includes(selectedType)
              ? "buttModalImage fullBody"
              : selectedType === "rex-roar"
              ? "buttModalImage rexRoar"
              : selectedType === "medium"
              ? "buttModalImage medium"
              : "buttModalImage fullRes"
          } mobile`}
          src={buttImage}
          alt={`Lazy Butt #${butt.id}`}
        />
      )}
      <Traits buttMetadata={buttMetadata} />
    </div>
  );

  return isMobile ? mobileLayout : desktopLayout;
};

// modal for displaying butt details and download button
const CubModal = ({ butt, myLions }) => {
  const isMobile = useIsMobile();
  const { closeModal } = useModal();
  const [isLoading, setIsLoading] = useState(true);
  const [cubImage, setCubImage] = useState(null);
  const [buttMetadata, setButtMetadata] = useState(null);
  const [selectedType, setSelectedType] = useState("full-res");

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
      const imageBlob = await getSeasonalCubImage(butt.id);
      const buttImage = URL.createObjectURL(imageBlob);
      setCubImage(buttImage);
      setIsLoading(false);
    };
    const fetchMetadata = async () => {
      const metadata = await getMetadata(butt.id);
      setButtMetadata(metadata);
    };
    fetchMetadata();
    fetchCubImage();
  }, [butt]);

  const handleModalClose = () => {
    closeModal();
  };

  return (
    <>
      <div className="buttModalOverlay"></div>
      <div className="buttModal">
        <DownloadBar
          butt={butt}
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
            Lazy Cub #{butt.id}
          </div>
          <ModalContent
            butt={butt}
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
