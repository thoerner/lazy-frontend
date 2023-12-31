import { useEffect, useState } from "react";
import {
  getFullResButtImage,
  getFullBodyImage,
  getFullBodyThumbImage,
  getMediumButtImage,
  getTransparentImage,
  getSocialImage,
  getSeasonalButtImage,
} from "../utils/api.js";
import { getSessionToken } from "../utils/session.js";
import { useIsMobile } from "../utils/tools.js";
import { useAccount } from "wagmi";
import toast from "react-hot-toast";
import "../styles/DownloadButton.css";

// button for downloading butt images
const DownloadBar = ({
  butt,
  setButtImage,
  setIsLoading,
  selectedType,
  setSelectedType,
  myLions,
}) => {
  const isMobile = useIsMobile();
  const [blobs, setBlobs] = useState({}); // TODO: change to preview blobs and then when download is clicked, download the full res
  const { address } = useAccount();
  const sessionToken = getSessionToken();
  const { id: buttId } = butt;

  useEffect(() => {
    const fetchButtImage = async () => {
      const mediumBlob = await getMediumButtImage(buttId);
      setBlobs({ medium: mediumBlob });
    };
    fetchButtImage();
  }, [butt, address, sessionToken]);

  const handleDownloadClick = async () => {
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
    if (!myLions.some((lion) => lion.id === buttId)) {
      toast(
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          You must own Lazy Lion #{buttId} to download the Full Body image!
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
    if (!myLions.some((lion) => lion.id === buttId)) {
      toast(
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          You must own Lazy Lion #{buttId} to download the Social image!
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
    if (!myLions.some((lion) => lion.id === buttId)) {
      toast(
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          You must own Lazy Lion #{buttId} to download the Social image!
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
    if (!myLions.some((lion) => lion.id === buttId)) {
      toast(
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          You must own Lazy Lion #{buttId} to download the Social image!
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
      return;
    }
    setIsLoading(true);
    setSelectedType("seasonal");
    if (blobs["seasonal"]) {
      setImage(blobs["seasonal"]);
    } else {
      const seasonalBlob = await getSeasonalButtImage(
        buttId,
        address,
        sessionToken
      );
      setBlobs({ ...blobs, seasonal: seasonalBlob });
      setImage(seasonalBlob);
    }
    setIsLoading(false);
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
        const blob = address && sessionToken ? getImage(buttId, address, sessionToken) : getImage(buttId);
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
              selectedType === "transparent" ? "selected" : null
            }`}
            onClick={() => handleTransparentImageButtonClick(buttId)}
          >
            Transparent {!isMobile ? `(5k × 10k)` : null}
          </div>
          <div
            className={`downloadButtonDropdownItem ${
              selectedType === "full-body" ? "selected" : null
            }`}
            onClick={() => handleFullBodyButtonClick()}
          >
            Full Body {!isMobile ? `(8k × 16k)` : null}
          </div>
        </div>
        <div className="downloadBar">
          <div
            className={`downloadButtonDropdownItem ${
              selectedType === "full-res" ? "selected" : null
            }`}
            onClick={() => handleFullResButtonClick()}
          >
            Butt {!isMobile ? `(8k × 8k)` : null}
          </div>
          <div
            className={`downloadButtonDropdownItem ${
              selectedType === "seasonal" ? "selected" : null
            }`}
            onClick={() => handleSeasonalButtonClick()}
          >
            Seasonal {!isMobile ? `(2k × 2k)` : null}
          </div>
          <div
            className={`downloadButtonDropdownItem ${
              selectedType === "social" ? "selected" : null
            }`}
            onClick={() => handleSocialImageButtonClick()}
          >
            Social {!isMobile ? `(1k × 1k)` : null}
          </div>
        </div>
      </div>
    );
  };

  const desktopLayout = () => {
    return (
      <div className="downloadBar">
        <div
          className={`downloadButtonDropdownItem ${
            selectedType === "full-res" ? "selected" : null
          }`}
          onClick={() => handleFullResButtonClick()}
        >
          Butt Only{" "}
          {!isMobile ? (
            <>
              <br />
              8k×8k
            </>
          ) : null}
        </div>
        <div
          className={`downloadButtonDropdownItem ${
            selectedType === "medium" ? "selected" : null
          }`}
          onClick={() => handleTransparentImageButtonClick()}
        >
          Transparent{" "}
          {!isMobile ? (
            <>
              <br />
              5k×10k
            </>
          ) : null}
        </div>
        <div
          className={`downloadButtonDropdownItem ${
            selectedType === "full-body" ? "selected" : null
          }`}
          onClick={() => handleFullBodyButtonClick()}
        >
          Full Body{" "}
          {!isMobile ? (
            <>
              <br />
              8k×16k
            </>
          ) : null}
        </div>
        <div
          className={`downloadButtonDropdownItem ${
            selectedType === "seasonal" ? "selected" : null
          }`}
          onClick={() => handleSeasonalButtonClick()}
        >
          Seasonal{" "}
          {!isMobile ? (
            <>
              <br />
              2k×2k
            </>
          ) : null}
        </div>
        <div
          className={`downloadButtonDropdownItem ${
            selectedType === "social" ? "selected" : null
          }`}
          onClick={() => handleSocialImageButtonClick()}
        >
          Social{" "}
          {!isMobile ? (
            <>
              <br />
              1k×1k
            </>
          ) : null}
        </div>
      </div>
    );
  };

  return (
    <div className="downloadBarsContainer">
      {isMobile ? mobileLayout() : desktopLayout()}
      <div
        className="downloadButtonDropdownItem download"
        onClick={() => handleDownloadClick()}
      >
        Download
      </div>
    </div>
  );
};

export default DownloadBar;
