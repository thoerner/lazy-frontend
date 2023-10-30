import PropType from "prop-types";
import { useWeb3Modal } from "@web3modal/react";
import { shortAddress } from "../utils/tools.js";

const WalletConnectButton = ({ address, isConnected }) => {
  const { open } = useWeb3Modal();
  return (
    <button id="walletButton" onClick={() => open()}>
      {isConnected ? shortAddress(address) : "Connect Wallet"}
    </button>
  );
};

WalletConnectButton.propTypes = {
  address: PropType.string.isRequired,
  isConnected: PropType.bool.isRequired,
};

export default WalletConnectButton;
