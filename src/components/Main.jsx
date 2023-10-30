import PropType from 'prop-types'
import ButtLogo from './ButtLogo.jsx'
import ButtGif from './ButtGif.jsx'
import BehindTheTail from './BehindTheTail.jsx'
import WhatsInAButt from './WhatsInAButt.jsx'
import ClaimYourButt from './ClaimYourButt.jsx'
import MintFundsInfo from './MintFundsInfo.jsx'
import AboutTheProject from './AboutTheProject.jsx'
import TeamSection from './TeamSection.jsx'
import Disclaimer from './Disclaimer.jsx'
import TeamStatements from './TeamStatements.jsx'
import AttentionToDetails from './AttentionToDetails.jsx'
import MintAnnouncement from './MintAnnouncement.jsx'

const Main = ({ isMobile }) => {
    return (
        <div className="main">
            <ButtLogo isMobile={isMobile} />
            <Disclaimer />
            <ButtGif isMobile={isMobile} />
            <MintAnnouncement />
            <BehindTheTail />
            <WhatsInAButt isMobile={isMobile} />
            <AttentionToDetails />
            <ClaimYourButt />
            <MintFundsInfo />
            <AboutTheProject />
            <TeamSection isMobile={isMobile} />
            <TeamStatements />
        </div>
    )
}

Main.propTypes = {
    isMobile: PropType.bool.isRequired,
}

export default Main;