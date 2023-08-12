import { Link } from "react-router-dom"
import WalletConnectButton from "./WalletConnectButton.jsx"

const SignMessage = ({ handleSignClick }) => {
    return (
        <div className="signMessage">
            <p>
                To view your Lazy Butts, please sign a message with your wallet.
            </p>
            <p>
                <button className="button" onClick={handleSignClick}>
                    Sign Message
                </button>
            </p>
        </div>
    )
}

const ClaimMessage = () => {
    return (
        <div className="claimMessage">
            <p>
                You don't have any Lazy Butts yet.
            </p>
            <br />
            <Link to="/claim">
                <button className="button">Claim a Lazy Butt</button>
            </Link>
        </div>
    )
}

const ConnectMessage = () => {
    return (
        <div className="connectMessage">
            <p>
                To view your Lazy Butts, please connect your wallet.
            </p>
            <br />
            <WalletConnectButton />
        </div>
    )
}

export {
    SignMessage,
    ClaimMessage,
    ConnectMessage
}