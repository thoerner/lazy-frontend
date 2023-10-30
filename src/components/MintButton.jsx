import PropTypes from "prop-types";
import toast from "react-hot-toast";
import {
  useContractEvent,
  useContractWrite,
  useBalance,
  useAccount,
} from "wagmi";
import LazyButtsAbi from "../contracts/LazyButts.js";
import { BUTTS_CONTRACT_ADDRESS } from "../utils/constants.js";

const MintButton = ({
  selectedLions,
  allowListActive,
  isAllowListed,
  totalPrice,
  proof,
  setIsClaiming,
  setRefreshButts,
  setSelectedLions,
  setIsClaimed,
  mintActive,
}) => {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({
    address,
    watch: true,
  });

  const value = BigInt(totalPrice * 10 ** 18);

  const handleClaimButtClick = async (selectedLions) => {
    if (!isConnected) {
      toast.error("Please connect your wallet");
      return;
    }
    if (allowListActive && !isAllowListed) {
      toast.error("You are not on the Early Access list.");
      return;
    }
    if (selectedLions.length < 1) {
      toast.error("Please select at least one Lazy Lion.");
      return;
    }
    setIsClaiming(true);
    write?.();
  };

  const params = {
    address: BUTTS_CONTRACT_ADDRESS,
    abi: LazyButtsAbi,
    functionName: "mintManyButts",
    args: [selectedLions.map((lion) => lion.id)],
    value: value,
    onSettled(data, error) {
      if (error) {
        if (error.message.includes("User rejected the request")) {
          toast.error("Transaction rejected");
        } else if (error.message.includes("Insufficient funds")) {
          toast.error("Insufficient funds");
        } else {
          toast.error("Transaction failed");
        }
        setIsClaiming(false);
      }
    },
    onSuccess() {
      toast.success(`Transaction submitted!`);
    },
  };

  const allowListParams = {
    address: BUTTS_CONTRACT_ADDRESS,
    abi: LazyButtsAbi,
    functionName: "mintAllowList",
    args: [proof?.proof, selectedLions.map((lion) => lion.id)],
    value: value,
    onSettled(data, error) {
      if (error) {
        console.log(error);
        if (error.message.includes("User rejected the request")) {
          toast.error("Transaction rejected");
        } else if (error.message.includes("Insufficient funds")) {
          toast.error("Insufficient funds");
        } else {
          toast.error("Transaction failed");
        }
        setIsClaiming(false);
      }
    },
    onSuccess() {
      toast.success(`Transaction submitted!`);
    },
  };
  const config = allowListActive && isAllowListed ? allowListParams : params;
  // const { config } = usePrepareContractWrite(activeParams)
  const { write } = useContractWrite(config);

  const unwatch = useContractEvent({
    address: BUTTS_CONTRACT_ADDRESS,
    abi: LazyButtsAbi,
    eventName: "Mint",
    listener(log) {
      const to = log[0].args.to;
      if (to.toLowerCase() === address.toLowerCase()) {
        setTimeout(() => {
          toast.success("Lazy Butts claimed!");
          setIsClaimed(true);
          setRefreshButts(true);
          setSelectedLions([]);
        }, 7000);
        unwatch?.();
      }
    },
  });

  if (!mintActive && !allowListActive) {
    return <button disabled>Mint not active</button>;
  }
  if (balance?.value < value) {
    return <button disabled>Insufficient Balance</button>;
  }
  return (
    <button
      onClick={() => handleClaimButtClick(selectedLions, address, config)}
    >
      {selectedLions.length > 1
        ? "Claim Butts"
        : selectedLions.length > 0
        ? "Claim Butt"
        : "Claim Butt"}
    </button>
  );
};

MintButton.propTypes = {
  selectedLions: PropTypes.array,
  allowListActive: PropTypes.bool,
  isAllowListed: PropTypes.bool,
  totalPrice: PropTypes.number,
  proof: PropTypes.object,
  setIsClaiming: PropTypes.func,
  setRefreshButts: PropTypes.func,
  setSelectedLions: PropTypes.func,
  setIsClaimed: PropTypes.func,
  mintActive: PropTypes.bool,
};

export default MintButton;
