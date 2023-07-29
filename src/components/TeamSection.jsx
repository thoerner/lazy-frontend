import TeamInfo from './TeamInfo.jsx'

const TeamSection = ({ isMobile }) => {
    return (
        <div className="card" style={!isMobile ? { maxWidth: '90vw', flexWrap: 'wrap' } : null}>
            <TeamInfo isMobile={isMobile} />
        </div>
    )
}

export default TeamSection