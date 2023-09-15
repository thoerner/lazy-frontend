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

const MintAnnouncement = () => {
    return (
        <div className="mint-announcement">
            <div className="mint-announcement-text">
                <h2>Early Access Claim on 9/22! Public Claim on 9/23!</h2>
                <p>
                    See the <a href="https://x.com/3DKingsNFT/status/1438237702025076224" target="_blank" rel="noreferrer">X announcement</a> for more details.
                </p>
            </div>
        </div>
    )
}

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

export default Main;