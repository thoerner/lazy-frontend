const TeamMember = ({ name, role, image }) => {
    return (
        <div className="team-member">
            <img src={image} className="team-member-image" alt={name} />
            <div className="team-member-name">{name}</div>
            <div className="team-member-role">{role}</div>
        </div>
    )
}

export default TeamMember