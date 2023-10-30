import PropType from "prop-types";

const TeamMember = ({ name, role, image, twitter }) => {
  return (
    <>
      <a href={twitter} target="_blank" rel="noreferrer">
        <div className="team-member">
          <img src={image} className="team-member-image" alt={name} />
          <div className="team-member-name">{name}</div>
          <div className="team-member-role">{role}</div>
        </div>
      </a>
    </>
  );
};

TeamMember.propTypes = {
  name: PropType.string.isRequired,
  role: PropType.string.isRequired,
  image: PropType.string.isRequired,
  twitter: PropType.string.isRequired,
};

export default TeamMember;
