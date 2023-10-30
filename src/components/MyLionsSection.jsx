import { useState, useEffect } from "react";
import MyLions from "./MyLions";
import EmptyLion from "../assets/lion-silhouette.png";
import toast from "react-hot-toast";
import RemoteMintModal from "./RemoteMintModal";

const MyLionsSection = ({
  isConnected,
  myLions,
  handleLionClick,
  selectedLions,
  address,
  myButts,
  setIsClaiming,
  setRefreshButts,
  setIsClaimed,
  mintActive,
}) => {
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const [remoteMintShown, setRemoteMintShown] = useState(false);

  useEffect(() => {
    if (isConnected && myLions.length > 0) {
      setIsLoadingPage(false);
    }
  }, [isConnected, myLions]);

  const handleRemoteMintClick = () => {
    if (!isConnected) {
      toast.error("Please connect your wallet");
      return;
    }
    if (remoteMintShown) {
      return;
    }
    setRemoteMintShown(true);
    return;
  };

  return (
    <div className="claim-area-left">
      {remoteMintShown ? (
        <RemoteMintModal
          setRemoteMintShown={setRemoteMintShown}
          address={address}
          setIsClaiming={setIsClaiming}
          setRefreshButts={setRefreshButts}
          setIsClaimed={setIsClaimed}
          mintActive={mintActive}
        />
      ) : null}
      <div className="claim-area-left-title">
        <h3>My Lazy Lions</h3>
        {myLions.length > 0 && isConnected ? (
          <p
            style={{
              color: selectedLions.length === 5 ? "#00caf8" : "#aaa",
              fontSize: "1rem",
            }}
          >
            {selectedLions.length === 5
              ? `Max Lions Selected`
              : `Choose Your Lion(s)`}
          </p>
        ) : null}
        <span
          style={{
            color: "#dddddd",
            fontSize: "1rem",
          }}
        >
          Lions vaulted?{" "}
        </span>
        <div
          style={{
            color: "#00caf8",
            fontSize: "1rem",
            cursor: "pointer",
          }}
          onClick={() => {
            handleRemoteMintClick();
          }}
        >
          Remote mint!
        </div>
      </div>
      <div className="claim-area-left-info">
        <div className={`my-lions-container ${!isConnected ? "empty" : null}`}>
          {!isConnected ? (
            <div className="my-lions-empty">
              <p>Connect your wallet to view your Lazy Lions.</p>
            </div>
          ) : isConnected && myLions.length === 0 ? (
            <div className="my-lions-empty">
              <p>You don't own any Lazy Lions yet.</p>
              <p>
                Head over to the{" "}
                <a
                  href="https://opensea.io/collection/lazy-lions"
                  target="_blank"
                  rel="noreferrer"
                >
                  Lazy Lions OpenSea
                </a>{" "}
                page to find some.
              </p>
              <img
                src={EmptyLion}
                alt="Empty Lion"
                style={{ maxWidth: "250px" }}
              />
            </div>
          ) : isLoadingPage ? (
            <div className="loading-container">
              <div className="loading"></div>
            </div>
          ) : isConnected ? (
            <MyLions
              lions={myLions}
              butts={myButts}
              handleLionClick={handleLionClick}
              selectedLions={selectedLions}
              address={address}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default MyLionsSection;
