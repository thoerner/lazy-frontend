import { useState } from "react";
import PropTypes from "prop-types";
import MintButton from "./MintButton";

const RemoteMintModal = ({
  setRemoteMintShown,
  address,
  setIsClaiming,
  setRefreshButts,
  setIsClaimed,
  mintActive,
}) => {
  const [tokenId, setTokenId] = useState(null);
  const { VITE_ENV } = import.meta.env;

  const PRICE = VITE_ENV === "dev" ? 0 : 0.02;

  const handleInputUpdate = (e) => {
    setTokenId(e.target.value);
  };

  return (
    <div className="remote-mint-modal">
      <div className="remote-mint-modal-content">
        <h1>Remote Mint</h1>
        <p>
          Enter the token ID of the Lazy Butt you want to mint. The Lazy Butt
          will be minted to the address holding the associated Lazy Lion NFT.
        </p>
        <p>
          <strong>NOTE:</strong> This will permanently associate your vault
          with the currently connected wallet.
        </p>
        <b>Connected Wallet:</b>
        <code
          style={{
            color: "#00caf8",
          }}
        >
          {address}{" "}
        </code>
        <p>
          <b>Token ID:</b>
        </p>
        <input
          type="text"
          placeholder="Token ID"
          style={{
            width: "80px",
            padding: "0.5rem",
            fontSize: "1rem",
          }}
          onChange={(e) => handleInputUpdate(e)}
        />
        <p>Total Cost: {PRICE} ETH</p>
        <img
          src={`https://lazybutts.s3.amazonaws.com/public/images/small-lazy-lions/${tokenId}.png`}
          alt="lion"
          className="default-image"
          style={{
            width: "100px",
            height: "100px",
            visibility: tokenId ? "visible" : "hidden",
          }}
        />
        <div className="remote-mint-modal-buttons">
          <button onClick={() => setRemoteMintShown(false)}>Cancel</button>
          <MintButton
            selectedLions={[
              {
                id: tokenId,
              },
            ]}
            allowListActive={false}
            isAllowListed={false}
            totalPrice={PRICE}
            proof={null}
            setIsClaiming={setIsClaiming}
            setRefreshButts={setRefreshButts}
            setSelectedLions={setTokenId}
            setIsClaimed={setIsClaimed}
            mintActive={mintActive}
          />
        </div>
        <p>
          Need help? <a href="mailto:info@the3dkings.io">Contact us</a>
        </p>
      </div>
    </div>
  );
};

RemoteMintModal.propTypes = {
  setRemoteMintShown: PropTypes.func.isRequired,
  address: PropTypes.string.isRequired,
  setIsClaiming: PropTypes.func.isRequired,
  setRefreshButts: PropTypes.func.isRequired,
  setIsClaimed: PropTypes.func.isRequired,
  mintActive: PropTypes.bool.isRequired,
};

export default RemoteMintModal;
