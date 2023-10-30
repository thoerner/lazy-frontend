import PropType from "prop-types";
import TeamInfo from "./TeamInfo.jsx";

const TeamSection = ({ isMobile }) => {
  return (
    <div
      className="card"
      style={!isMobile ? { maxWidth: "90vw", flexWrap: "wrap" } : null}
    >
      <TeamInfo isMobile={isMobile} />
    </div>
  );
};

TeamSection.propTypes = {
  isMobile: PropType.bool.isRequired,
};

export default TeamSection;
