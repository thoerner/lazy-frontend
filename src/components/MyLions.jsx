import { useState, useEffect } from "react";
import PropType from "prop-types";
import { getSessionToken } from "../utils/session.js";
import { getSmallButtImage } from "../utils/api.js";
import EmptyLion from "../assets/lion-silhouette.png";
import uniques from "../utils/uniques.js";

const MyLions = ({ lions, butts, handleLionClick, selectedLions, address }) => {
  const [buttImages, setButtImages] = useState([]);

  useEffect(() => {
    const fetchButtImages = async () => {
      const buttImagesPromises = butts.map(async (butt) => {
        const imageBlob = await getSmallButtImage(
          butt.id,
          address,
          getSessionToken()
        );
        const imageUrl = URL.createObjectURL(imageBlob);
        return {
          id: butt.id,
          image: imageUrl,
        };
      });

      const buttImages = await Promise.all(buttImagesPromises);
      setButtImages(buttImages);
    };

    fetchButtImages();
  }, [butts]);

  const lionList = lions.map((lion) => {
    if (uniques.includes(lion.id)) return null;
    const isClaimed = butts.some((butt) => butt.id === lion.id);
    const isSelected = selectedLions.some(
      (selectedLion) => selectedLion.id === lion.id
    );
    const clickHandler = isClaimed ? undefined : () => handleLionClick(lion);
    const buttImage =
      buttImages.find((buttImage) => buttImage.id === lion.id)?.image ??
      EmptyLion;

    return (
      <div
        className={`my-lion ${isClaimed ? "claimed" : ""} ${
          isSelected ? "selected" : ""
        }`}
        key={lion.id}
        onClick={clickHandler}
      >
        <div className="my-lion-image">
          <img
            src={`https://lazybutts.s3.amazonaws.com/public/images/small-lazy-lions/${lion.id}.png`}
            alt="lion"
            className="default-image"
          />
          {isClaimed && (
            <div className="overlay-container">
              <img src={buttImage} alt="lion" className="hover-image" />
              <div className="overlay-text">CLAIMED</div>
            </div>
          )}
        </div>

        <div className="my-lion-info">
          <p className="my-lion-id">Lazy Lions #{lion.id}</p>
        </div>
      </div>
    );
  });

  return <div className="my-lions">{lionList}</div>;
};

MyLions.propTypes = {
  lions: PropType.arrayOf(
    PropType.shape({
      id: PropType.number.isRequired,
    })
  ).isRequired,
  butts: PropType.arrayOf(
    PropType.shape({
      id: PropType.number.isRequired,
    })
  ).isRequired,
  handleLionClick: PropType.func.isRequired,
  selectedLions: PropType.arrayOf(
    PropType.shape({
      id: PropType.number.isRequired,
    })
  ).isRequired,
  address: PropType.string.isRequired,
};

export default MyLions;
