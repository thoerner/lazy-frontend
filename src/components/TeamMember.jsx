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
    )
}

export default TeamMember