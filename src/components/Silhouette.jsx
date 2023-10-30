import PropType from "prop-types";
import SparkleOverlay from "../components/SparkleOverlay";

const Silhouette = ({ lionId, isTwinkling }) => {
  return (
    <>
      <div className="silhouette-card-image-top">
        <img
          src={`https://lazybutts.s3.amazonaws.com/public/images/small-lazy-lions/${lionId}.png`}
          alt="lion"
        />
      </div>
      <div className="silhouette-card-image-bottom">
        <SparkleOverlay
          baseImageUrl={`https://lazybutts.s3.amazonaws.com/public/images/silhouettes/${lionId}.png`}
          isTwinkling={isTwinkling}
        />
      </div>
    </>
  );
};

Silhouette.propTypes = {
  lionId: PropType.number.isRequired,
  isTwinkling: PropType.bool.isRequired,
};

export default Silhouette;
