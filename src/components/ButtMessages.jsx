import PropType from "prop-types";
import { Link } from "react-router-dom";
import WalletConnectButton from "./WalletConnectButton.jsx";

const styles = {
  message: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    textAlign: "center",
    color: "#eee",
    cursor: "default",
  },
  messageContainer: {
    backgroundColor: "#222",
    borderRadius: "10px",
    padding: "20px",
  },
};

const SignMessage = ({ handleSignClick }) => {
  return (
    <div className="signMessage">
      <div style={styles.messageContainer}>
        <p style={styles.message}>
          To view your Lazy Butts, please sign a message with your wallet.
        </p>
      </div>
      <p>
        <button className="button" onClick={handleSignClick}>
          Sign Message
        </button>
      </p>
    </div>
  );
};

SignMessage.propTypes = {
  handleSignClick: PropType.func.isRequired,
};

const ClaimMessage = () => {
  return (
    <div className="claimMessage">
      <div style={styles.messageContainer}>
        <p style={styles.message}>You don&apos;t have any Lazy Butts yet.</p>
      </div>
      <br />
      <Link to="/claim">
        <button className="button">Claim a Lazy Butt!</button>
      </Link>
    </div>
  );
};

const ConnectMessage = () => {
  return (
    <div className="connectMessage">
      <div style={styles.messageContainer}>
        <p style={styles.message}>
          To view your Lazy Butts, please connect your wallet.
        </p>
      </div>
      <br />
      <WalletConnectButton />
    </div>
  );
};

export { SignMessage, ClaimMessage, ConnectMessage };
