import PropType from "prop-types";
import Silhouette from "../components/Silhouette";
import Logo from "../assets/lazybutts.png";

const ClaimAreaMiddle = ({ selectedLions }) => {
  return (
    <div className="claim-area-middle">
      <img
        src={Logo}
        alt="Lazy Butts"
        style={{
          width: "100%",
          maxWidth: "75%",
          position: "absolute",
          opacity: selectedLions.length === 0 ? 1 : 0.15,
        }}
      />

      {selectedLions.length > 4 ? (
        <div className="silhouette-card stacked-four">
          <Silhouette lionId={selectedLions[4].id} isTwinkling={true} />
        </div>
      ) : null}
      {selectedLions.length > 3 ? (
        <div className="silhouette-card stacked-three">
          <Silhouette
            lionId={selectedLions[3].id}
            isTwinkling={selectedLions.length < 5 ? true : false}
          />
        </div>
      ) : null}
      {selectedLions.length > 2 ? (
        <div className="silhouette-card stacked-two">
          <Silhouette
            lionId={selectedLions[2].id}
            isTwinkling={selectedLions.length < 4 ? true : false}
          />
        </div>
      ) : null}
      {selectedLions.length > 1 ? (
        <div className="silhouette-card stacked-one">
          <Silhouette
            lionId={selectedLions[1].id}
            isTwinkling={selectedLions.length < 3 ? true : false}
          />
        </div>
      ) : null}
      {selectedLions.length > 0 ? (
        <div className="silhouette-card">
          <Silhouette
            lionId={selectedLions[0].id}
            isTwinkling={selectedLions.length < 2 ? true : false}
          />
        </div>
      ) : null}
    </div>
  );
};

ClaimAreaMiddle.propTypes = {
  selectedLions: PropType.array,
};

export default ClaimAreaMiddle;
