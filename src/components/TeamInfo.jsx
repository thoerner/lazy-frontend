import TeamMember from './TeamMember.jsx'
import Crypt0potamus from '../assets/team/crypt0potamus.png'
import Localcryptogod from '../assets/team/localcryptogod.png'
import JohnTheCraftsman from '../assets/team/johnthecraftsman.png'
import GlutenFree from '../assets/team/glutenfree.png'

const TeamInfo = ({isMobile}) => {
    return (
        <div className="team-info">
            <h1>Team</h1>
            <div className={!isMobile ? 'team-members' : 'team-members-mobile'} >
            <TeamMember
                name="John the Craftsman"
                role="Artist"
                image={JohnTheCraftsman}
                twitter="https://twitter.com/johnthecraftman"
            />
            <TeamMember
                name="Gluten&nbsp;Free"
                role="Artist"
                image={GlutenFree}
                twitter="https://twitter.com/gluten0freenft"
            />
            <TeamMember
                name="Localcryptogod"
                role="Project Organizer"
                image={Localcryptogod}
                twitter="https://twitter.com/localcryptogod"
            />
            <TeamMember
                name="Crypt0potamus"
                role="Software Developer and Maintainer"
                image={Crypt0potamus}
                twitter="https://twitter.com/crypt0potamus"
            />
            </div>
        </div>
    )
}

export default TeamInfo