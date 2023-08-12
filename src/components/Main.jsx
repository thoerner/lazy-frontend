import ButtLogo from './ButtLogo.jsx'
import ButtGif from './ButtGif.jsx'
import BehindTheTail from './BehindTheTail.jsx'
import WhatsInAButt from './WhatsInAButt.jsx'
import ClaimYourButt from './ClaimYourButt.jsx'
import MintFundsInfo from './MintFundsInfo.jsx'
import AboutTheProject from './AboutTheProject.jsx'
import TeamSection from './TeamSection.jsx'

const Main = ({ isMobile }) => {
    return (
        <div className="main">
            <ButtLogo isMobile={isMobile} />
            <ButtGif isMobile={isMobile} />
            <BehindTheTail />
            <WhatsInAButt isMobile={isMobile} />
            <ClaimYourButt />
            <MintFundsInfo />
            <AboutTheProject />
            <TeamSection isMobile={isMobile} />
        </div>
    )
}

export default Main;