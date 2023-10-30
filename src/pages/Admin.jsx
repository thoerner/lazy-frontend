import { useState, useEffect } from "react";
import { useAccount, useContractWrite, useContractRead } from "wagmi";
import LazyButtsAbi from "../contracts/LazyButts.js";
import toast from "react-hot-toast";
import "../styles/Admin.css";
import { BUTTS_CONTRACT_ADDRESS } from "../utils/constants.js";

const { VITE_ENV } = import.meta.env;

const payees =
  VITE_ENV === "dev"
    ? [
        "0x7B850fEf1064680d2F9e86CD1a0B83C052a2620c", // Community Wallet
        "0x616188ADB7928954B922FBc672e2f3e82f4db578", // Operational Wallet
        "0x626cdB47a91810EDb2Bde1d69e60C1B17071CF25", // Team Member Wallet
        "0x6628FC01ae06E134e08E4E8A01Ed1075C77c87A1", // Team Member Wallet
        "0x7Cf39e8D6F6f9F25E925Dad7EB371276231780d7", // Team Member Wallet
        "0xC02Dd50b25364e747410730A1df9B72A92C3C68B", // Team Member Wallet
      ]
    : [
        "0x49CAE18B5B796e993Cce4A43cAdA316B8c7388eC", // Community Wallet
        "0x616188ADB7928954B922FBc672e2f3e82f4db578", // Operational Wallet
        "0x626cdB47a91810EDb2Bde1d69e60C1B17071CF25", // Team Member Wallet
        "0x6628FC01ae06E134e08E4E8A01Ed1075C77c87A1", // Team Member Wallet
        "0x7Cf39e8D6F6f9F25E925Dad7EB371276231780d7", // Team Member Wallet
        "0xC02Dd50b25364e747410730A1df9B72A92C3C68B", // Team Member Wallet
      ];

function bigIntToDecimal(bigIntValue, decimalPlaces = 18) {
  let bigIntStr = bigIntValue.toString();

  if (bigIntStr.length <= decimalPlaces) {
    // Pad the number with leading zeroes
    bigIntStr = bigIntStr.padStart(decimalPlaces + 1, "0");
  }

  const decimalPointIndex = bigIntStr.length - decimalPlaces;
  const decimalStr =
    bigIntStr.slice(0, decimalPointIndex) +
    "." +
    bigIntStr.slice(decimalPointIndex, decimalPointIndex + 3);
  const result = parseFloat(decimalStr);

  // If the result is NaN, return 0
  return isNaN(result) ? 0 : result;
}

const AdminPage = ({ setActivePage }) => {
  const [address, setAddress] = useState("");
  const [balance0, setBalance0] = useState(0);
  const [balance1, setBalance1] = useState(0);
  const [balance2, setBalance2] = useState(0);
  const [balance3, setBalance3] = useState(0);
  const [balance4, setBalance4] = useState(0);
  const [balance5, setBalance5] = useState(0);
  const [totalReleased, setTotalReleased] = useState(0);
  const { isConnected } = useAccount();

  useEffect(() => {
    setActivePage("admin");
  }, [setActivePage]);

  useEffect(() => {
    if (address === "") return;
    write?.();
    setAddress("");
  }, [address]);

  function getTotalReleasedParams() {
    return {
      address: BUTTS_CONTRACT_ADDRESS,
      abi: LazyButtsAbi,
      functionName: "totalReleased",
      args: [],
      onSettled(data, error) {
        if (error) {
          console.log(error);
        } else {
          setTotalReleased(data);
          console.log(data);
        }
      },
    };
  }

  function getBalanceParams(index) {
    return {
      address: BUTTS_CONTRACT_ADDRESS,
      abi: LazyButtsAbi,
      functionName: "releasable",
      args: [payees[index]],
      onSettled(data, error) {
        if (error) {
          console.log(error);
        } else {
          switch (index) {
            case 0:
              setBalance0(data);
              break;
            case 1:
              setBalance1(data);
              break;
            case 2:
              setBalance2(data);
              break;
            case 3:
              setBalance3(data);
              break;
            case 4:
              setBalance4(data);
              break;
            case 5:
              setBalance5(data);
              break;
            default:
              break;
          }
        }
      },
    };
  }

  useContractRead(getBalanceParams(0));
  useContractRead(getBalanceParams(1));
  useContractRead(getBalanceParams(2));
  useContractRead(getBalanceParams(3));
  useContractRead(getBalanceParams(4));
  useContractRead(getBalanceParams(5));
  useContractRead(getTotalReleasedParams());

  function totalRecieved() {
    return (
      balance0 +
      balance1 +
      balance2 +
      balance3 +
      balance4 +
      balance5 +
      totalReleased
    );
  }

  function currentBalance() {
    return totalRecieved() - totalReleased;
  }

  const params = {
    address: BUTTS_CONTRACT_ADDRESS,
    abi: LazyButtsAbi,
    functionName: "release",
    args: [address],
    value: 0,
    onSettled(data, error) {
      if (error) {
        if (error.message.includes("User rejected the request")) {
          toast.error("Transaction rejected");
        } else if (error.message.includes("Insufficient funds")) {
          toast.error("Insufficient funds");
        } else {
          toast.error("Transaction failed");
        }
      } else {
        toast.success("Transaction confirmed");
      }
    },
    onSuccess(data) {
      toast.success("Transaction submitted!");
    },
  };

  const { write } = useContractWrite(params);

  const handleButtonClick = async (index) => {
    if (!isConnected) {
      toast.error("Please connect your wallet");
      return;
    }
    setAddress(payees[index]);
  };

  return (
    <div className="adminPage">
      <h1>Admin Page</h1>
      <h2>Total Received: {bigIntToDecimal(totalRecieved())} ETH</h2>
      <h3>Current Balance: {bigIntToDecimal(currentBalance())} ETH</h3>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <button onClick={() => handleButtonClick(0)}>
          Release {bigIntToDecimal(balance0)} ETH to Community Wallet
        </button>
        <button onClick={() => handleButtonClick(1)}>
          Release {bigIntToDecimal(balance1)} ETH to Operational Wallet
        </button>
        <button onClick={() => handleButtonClick(2)}>
          Release {bigIntToDecimal(balance2)} ETH to JohnTheCraftsman
        </button>
        <button onClick={() => handleButtonClick(3)}>
          Release {bigIntToDecimal(balance3)} ETH to Gluten Free
        </button>
        <button onClick={() => handleButtonClick(4)}>
          Release {bigIntToDecimal(balance4)} ETH to localcryptogod
        </button>
        <button onClick={() => handleButtonClick(5)}>
          Release {bigIntToDecimal(balance5)} ETH to crypt0potamus
        </button>
      </div>
    </div>
  );
};

export default AdminPage;
