import Crypt0potamus from '../assets/team/crypt0potamus.png'
import Localcryptogod from '../assets/team/localcryptogod.png'
import JohnTheCraftsman from '../assets/team/johnthecraftsman.png'
import GlutenFree from '../assets/team/glutenfree.png'

const TeamMember = ({ name, role, image }) => {
    return (
        <div className="team-member">
            <img src={image} className="team-member-image" alt={name} />
            <div className="team-member-name">{name}</div>
            <div className="team-member-role">{role}</div>
        </div>
    )
}

const TeamInfo = ({isMobile}) => {
    return (
        <div className="team-info">
            <h1>Team</h1>
            <div style={!isMobile ? {flexDirection: 'row', display: 'flex', justifyContent: 'center', alignItems: 'center'} : null}>
            <TeamMember
                name="John the Craftsman"
                role="Artist"
                image={JohnTheCraftsman}
            />
            <TeamMember
                name="Gluten&nbsp;Free"
                role="Artist"
                image={GlutenFree}
            />
            <TeamMember
                name="Localcryptogod"
                role="Project Organizer"
                image={Localcryptogod}
            />
            <TeamMember
                name="Crypt0potamus"
                role="Software Developer and Maintainer"
                image={Crypt0potamus}
            />
            </div>
        </div>
    )
}

export default TeamInfo