import { useEffect, useState } from "react";
import {
  getFullResButtImage,
  getFullBodyImage,
  getFullBodyThumbImage,
  getMediumButtImage,
  getTransparentImage,
  getSocialImage,
  getSeasonalButtImage,
  getRexRoarImage,
  getCocoPrideImage,
} from "../utils/api.js";
import { getSessionToken } from "../utils/session.js";
import { useIsMobile } from "../utils/tools.js";
import { useAccount } from "wagmi";
import toast from "react-hot-toast";
import "../styles/DownloadButton.css";
import { FaDownload } from "react-icons/fa";
import ThanksgivingSelector from './ThanksgivingSelector';

function createTempAnchor(url, filename) {
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// button for downloading butt images
const DownloadBar = ({
  butt,
  setButtImage,
  setIsLoading,
  selectedType,
  setSelectedType,
  myLions,
  type = "butt",
  cubImage,
}) => {
  const isMobile = useIsMobile();
  const [blobs, setBlobs] = useState({}); // TODO: change to preview blobs and then when download is clicked, download the full res
  const { address } = useAccount();
  const sessionToken = getSessionToken();
  const { id: buttId } = butt;
  const [showThanksgivingSelector, setShowThanksgivingSelector] = useState(false);

  useEffect(() => {
    const fetchButtImage = async () => {
      if (type === "cub") {
        console.log(`typeof cubImage: ${typeof cubImage}`);
        console.log(JSON.stringify(cubImage));
        setBlobs({ seasonal: cubImage });
        setSelectedType("seasonal");
        return;
      }
      const mediumBlob = await getMediumButtImage(buttId);
      setBlobs({ medium: mediumBlob });
    };
    fetchButtImage();
  }, [butt, address, sessionToken]);

  const handleDownloadClick = async () => {
    if (type === "cub") {
      // blob is already url
      createTempAnchor(cubImage, `lazy-cub_seasonal_${buttId}.png`);
      return;
    }
    await downloadBlob(selectedType);
  };

  const downloadBlob = async (type) => {
    downloadImage(
      buttId,
      type,
      `lazy-butt_${type}_${buttId}.png`,
      address,
      sessionToken
    );
  };

  const setImage = (imageBlob) => {
    const buttImage = URL.createObjectURL(imageBlob);
    setButtImage(buttImage);
  };

  const handleMediumButtonClick = async () => {
    setIsLoading(true);
    setSelectedType("medium");
    if (blobs["medium"]) {
      setImage(blobs["medium"]);
    } else {
      const mediumBlob = await getMediumButtImage(buttId);
      setBlobs({ ...blobs, medium: mediumBlob });
      setImage(mediumBlob);
    }
    setIsLoading(false);
  };

  function isEligibleForDownload() {
    return myLions.some((lion) => lion.id === buttId);
  }

  function ineligibleToast(type) {
    toast(
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        You must own Lazy Lion #{buttId} to download the {type} image!
        <br />
        <a
          href={`https://opensea.io/assets/ethereum/0x8943c7bac1914c9a7aba750bf2b6b09fd21037e0/${buttId}`}
          target="_blank"
          rel="noreferrer"
        >
          <div
            style={{
              backgroundColor: "#00caf8aa",
              borderRadius: "0.5rem",
              height: "2rem",
              lineHeight: "2rem",
              padding: "0.5rem 1rem",
              marginTop: "0.5rem",
              border: "1px solid #00caf8",
            }}
          >
            Buy on OpenSea
          </div>
        </a>
      </div>
    );
  }

  const handleRexRoarButtonClick = async () => {
    if (!isEligibleForDownload()) {
      ineligibleToast("Rex Roar");
      return;
    }
    setIsLoading(true);
    setSelectedType("rex-roar");
    if (blobs["rex-roar"]) {
      setImage(blobs["rex-roar"]);
    } else {
      const rexRoarBlob = await getRexRoarImage(buttId);
      setBlobs({ ...blobs, "rex-roar": rexRoarBlob });
      setImage(rexRoarBlob);
    }
    setIsLoading(false);
  };

  const handleCocoPrideButtonClick = async () => {
    if (!isEligibleForDownload()) {
      ineligibleToast("Coco Pride");
      return;
    }
    setIsLoading(true);
    setSelectedType("coco-pride");
    if (blobs["coco-pride"]) {
      setImage(blobs["coco-pride"]);
    } else {
      const cocoPrideBlob = await getCocoPrideImage(buttId);
      setBlobs({ ...blobs, "coco-pride": cocoPrideBlob });
      setImage(cocoPrideBlob);
    }
    setIsLoading(false);
  };

  const handleFullResButtonClick = async () => {
    setIsLoading(true);
    setSelectedType("full-res");
    if (blobs["full-res"]) {
      setImage(blobs["full-res"]);
    } else {
      const fullResBlob = await getMediumButtImage(buttId);
      setBlobs({ ...blobs, "full-res": fullResBlob });
      setImage(fullResBlob);
    }
    setIsLoading(false);
  };

  const handleFullBodyButtonClick = async () => {
    console.log(myLions);
    if (!isEligibleForDownload()) {
      ineligibleToast("Full Body");
      return;
    }
    setIsLoading(true);
    setSelectedType("full-body");
    if (blobs["full-body"]) {
      setImage(blobs["full-body"]);
    } else {
      const fullBodyBlob = await getFullBodyThumbImage(
        buttId,
        address,
        sessionToken
      );
      setBlobs({ ...blobs, "full-body": fullBodyBlob });
      setImage(fullBodyBlob);
    }
    setIsLoading(false);
  };

  const handleSocialImageButtonClick = async () => {
    if (!isEligibleForDownload()) {
      ineligibleToast("Social");
      return;
    }
    setIsLoading(true);
    setSelectedType("social");
    if (blobs["social"]) {
      setImage(blobs["social"]);
    } else {
      const socialBlob = await getSocialImage(buttId, address, sessionToken);
      setBlobs({ ...blobs, social: socialBlob });
      setImage(socialBlob);
    }
    setIsLoading(false);
  };

  const handleTransparentImageButtonClick = async () => {
    if (!isEligibleForDownload()) {
      ineligibleToast("Transparent");
      return;
    }
    setIsLoading(true);
    setSelectedType("transparent");
    if (blobs["transparent"]) {
      setImage(blobs["transparent"]);
    } else {
      const transparentBlob = await getTransparentImage(
        buttId,
        address,
        sessionToken
      );
      setBlobs({ ...blobs, transparent: transparentBlob });
      setImage(transparentBlob);
    }
    setIsLoading(false);
  };

  const handleSeasonalButtonClick = async () => {
    if (!isEligibleForDownload()) {
      ineligibleToast("Seasonal");
      return;
    }
    setSelectedType("seasonal");
    setShowThanksgivingSelector(true);
  };

  const handleThanksgivingConfirm = async (selectedFriends) => {
    setShowThanksgivingSelector(false);
    setIsLoading(true);
    
    try {
      const seasonalBlob = await getSeasonalButtImage(
        buttId,
        address,
        sessionToken,
        selectedFriends.join(',')
      );
      setBlobs({ ...blobs, seasonal: seasonalBlob });
      setImage(seasonalBlob);
    } catch (error) {
      console.error('Error generating Thanksgiving image:', error);
      toast.error('Failed to generate Thanksgiving image');
    } finally {
      setIsLoading(false);
    }
  };

  const downloadImage = async (
    buttId,
    type,
    fileName,
    address,
    sessionToken
  ) => {
    const getImage =
      type === "full-res"
        ? getFullResButtImage
        : type === "full-body"
        ? getFullBodyImage
        : type === "social"
        ? getSocialImage
        : type === "seasonal"
        ? getSeasonalButtImage
        : type === "transparent"
        ? getTransparentImage
        : type === "rex-roar"
        ? getRexRoarImage
        : getMediumButtImage;

    function createTempAnchor(url, filename) {
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }

    const toastPromiseFunction = (() => {
      if (blobs[type] !== undefined) {
        return Promise.resolve(blobs[type]);
      } else {
        const blob =
          address && sessionToken
            ? getImage(buttId, address, sessionToken)
            : getImage(buttId);
        return blob;
      }
    })();

    const downloadToast = toast
      .promise(toastPromiseFunction, {
        loading: "Downloading...",
        success: "Download complete!",
        error: "Download failed",
      })
      .then((imageBlob) => {
        const url = window.URL.createObjectURL(imageBlob);
        createTempAnchor(url, fileName);
        window.URL.revokeObjectURL(url); // Free up memory
      });
  };

  const mobileLayout = () => {
    return (
      <div className="downloadBars">
        <div className="downloadBar">
          <div
            className={`downloadButtonDropdownItem ${
              selectedType === "full-res" ? "selected" : null
            }`}
            onClick={() => handleFullResButtonClick()}
          >
            Da Butt
          </div>
          <div
            className={`downloadButtonDropdownItem ${
              selectedType === "transparent" ? "selected" : null
            }`}
            onClick={() => handleTransparentImageButtonClick(buttId)}
          >
            No BG
          </div>

          <div
            className={`downloadButtonDropdownItem ${
              selectedType === "full-body" ? "selected" : null
            }`}
            onClick={() => handleFullBodyButtonClick()}
          >
            Full Body
          </div>
          <div
            className={`downloadButtonDropdownItem ${
              selectedType === "social" ? "selected" : null
            }`}
            onClick={() => handleSocialImageButtonClick()}
          >
            Social
          </div>
        </div>
        <div className="downloadBar">
          <div
            className={`downloadButtonDropdownItem ${
              selectedType === "seasonal" ? "selected" : null
            }`}
            onClick={() => handleSeasonalButtonClick()}
          >
            Seasonal
          </div>
          <div
            className={`downloadButtonDropdownItem ${
              selectedType === "rex-roar" ? "selected" : null
            }`}
            onClick={() => handleRexRoarButtonClick()}
          >
            Rex Roar
          </div>
          <div
            className={`downloadButtonDropdownItem ${
              selectedType === "coco-pride" ? "selected" : null
            }`}
            onClick={() => handleCocoPrideButtonClick()}
          >
            Coco Pride
          </div>
        </div>
      </div>
    );
  };

  const desktopLayout = () => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        <div className="downloadBar">
          <div
            className={`downloadButtonDropdownItem ${
              selectedType === "full-res" ? "selected" : null
            }`}
            onClick={() => handleFullResButtonClick()}
          >
            Da Butt{" "}
          </div>
          <div
            className={`downloadButtonDropdownItem ${
              selectedType === "medium" ? "selected" : null
            }`}
            onClick={() => handleTransparentImageButtonClick()}
          >
            No BG{" "}
          </div>
          <div
            className={`downloadButtonDropdownItem ${
              selectedType === "full-body" ? "selected" : null
            }`}
            onClick={() => handleFullBodyButtonClick()}
          >
            Full Body{" "}
          </div>
          <div
            className={`downloadButtonDropdownItem ${
              selectedType === "social" ? "selected" : null
            }`}
            onClick={() => handleSocialImageButtonClick()}
          >
            Social{" "}
          </div>
        </div>
        <div className="downloadBar">
          <div
            className={`downloadButtonDropdownItem ${
              selectedType === "seasonal" ? "selected" : null
            }`}
            onClick={() => handleSeasonalButtonClick()}
          >
            Seasonal{" "}
          </div>
          <div
            className={`downloadButtonDropdownItem ${
              selectedType === "rex-roar" ? "selected" : null
            }`}
            onClick={() => handleRexRoarButtonClick()}
          >
            Rex Roar{" "}
          </div>
          <div
            className={`downloadButtonDropdownItem ${
              selectedType === "coco-pride" ? "selected" : null
            }`}
            onClick={() => handleCocoPrideButtonClick()}
          >
            Coco Pride{" "}
          </div>
        </div>
      </div>
    );
  };

  // Only the big red Download button for cubs
  const cubLayout = () => {
    return <></>;
  };

  return (
    <div className="downloadBarsContainer">
      {type === "cub"
        ? cubLayout()
        : isMobile
        ? mobileLayout()
        : desktopLayout()}
      <div
        className="downloadButtonDropdownItem download"
        onClick={() => handleDownloadClick()}
      >
        <FaDownload />
      </div>
      {showThanksgivingSelector && (
        <div className="modalOverlay">
          <ThanksgivingSelector
            myLions={myLions}
            selectedLionId={buttId}
            onConfirm={handleThanksgivingConfirm}
            onCancel={() => setShowThanksgivingSelector(false)}
          />
        </div>
      )}
    </div>
  );
};

export default DownloadBar;
