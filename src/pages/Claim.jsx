import { useState, useEffect } from "react";
import PropType from "prop-types";
import { Link } from "react-router-dom";
import { useAccount } from "../utils/w3m";
import {
  getLions,
  getButts,
  isAllowListActive,
  getProof,
  isMintActive,
  getMintPrice,
} from "../utils/api";
import Footer from "../components/Footer";
import MyLionsSection from "../components/MyLionsSection";
import ClaimHeader from "../components/ClaimHeader";
import ClaimInfo from "../components/ClaimInfo";
import ClaimAreaRight from "../components/ClaimAreaRight";
import ClaimAreaMiddle from "../components/ClaimAreaMiddle";

const ClaimModal = ({
  isClaiming,
  setIsClaiming,
  isClaimed,
  setIsClaimed,
}) => {
  const [claimTimedOut, setClaimTimedOut] = useState(false);

  const handleClose = () => {
    setIsClaiming(false);
    setIsClaimed(false);
  };

  useEffect(() => {
    let timer;
    if (isClaiming) {
      timer = setTimeout(() => {
        setClaimTimedOut(true);
      }, 120000);
    }
    return () => clearTimeout(timer);
  }, [isClaiming]);

  const shouldDisplayTimeout = claimTimedOut && !isClaimed;

  return (
    <div className="claim-modal">
      {isClaimed ? (
        <h1>Claimed!</h1>
      ) : shouldDisplayTimeout ? (
        <h1>Finalizing Your Claim</h1>
      ) : (
        <h1>
          Claiming your <br />
          Lazy Butt!
        </h1>
      )}
      <div className="claim-loading-container">
        {shouldDisplayTimeout ? (
          <div>
            <p>
              Check your{" "}
              <Link to={"/butts"} onClick={() => handleClose()}>
                My Assets
              </Link>{" "}
              page to see if your Lazy Butt(s) have been claimed!
            </p>
          </div>
        ) : !isClaimed ? (
          <div className="loading"></div>
        ) : (
          <div>
            <p>
              Check your{" "}
              <Link to={"/butts"} onClick={() => handleClose()}>
                My Assets
              </Link>{" "}
              page to access your new Lazy Butt(s)!
            </p>
            <p>
              <a
                href="https://twitter.com/intent/tweet?text=I%20just%20claimed%20my%20Lazy%20Butt%20by%20@3DKingsNFT%20for%20my%20Lazy%20Lion!&url=https://the3dkings.io/"
                target="_blank"
                rel="noreferrer"
              >
                Share on X!
              </a>
            </p>
          </div>
        )}
      </div>
      {isClaimed && (
        <div className="claim-modal-close">
          <button onClick={() => handleClose()}>Close</button>
        </div>
      )}
    </div>
  );
};

ClaimModal.propTypes = {
  isMobile: PropType.bool.isRequired,
  isClaiming: PropType.bool.isRequired,
  setIsClaiming: PropType.func.isRequired,
  isClaimed: PropType.bool.isRequired,
  setIsClaimed: PropType.func.isRequired,
};

const Claim = ({ isMobile, setActivePage, myLions, setMyLions }) => {
  const { address, isConnected } = useAccount();
  const [myButts, setMyButts] = useState([]);
  const [selectedLions, setSelectedLions] = useState([]);
  const [price, setPrice] = useState(0.02);
  const [totalPrice, setTotalPrice] = useState(0);
  const [allowListActive, setAllowListActive] = useState(false);
  const [mintActive, setMintActive] = useState(false);
  const [proof, setProof] = useState(null);
  const [isAllowListed, setIsAllowListed] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);
  const [isClaimed, setIsClaimed] = useState(false);
  const [refreshButts, setRefreshButts] = useState(false);

  useEffect(() => {
    const fetchPrice = async () => {
      const price = await getMintPrice();
      setPrice(price);
    };
    fetchPrice();
  }, []);

  useEffect(() => {
    const fetchProof = async () => {
      const proof = await getProof(address);
      setProof(proof);
    };
    fetchProof();
  }, [address]);

  useEffect(() => {
    if (!proof) return;
    if (proof.success) {
      setIsAllowListed(true);
    } else if (proof.message) {
      setIsAllowListed(false);
    }
  }, [proof]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchAllowListActive = async () => {
      try {
        const data = await isAllowListActive();
        setAllowListActive(data);
      } catch (err) {
        console.log(err);
      }
    };
    const fetchMintActive = async () => {
      try {
        const data = await isMintActive();
        setMintActive(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllowListActive();
    fetchMintActive();
  }, []);

  useEffect(() => {
    setActivePage("claim");
  }, [setActivePage]);

  useEffect(() => {
    const fetchLions = async (address) => {
      const lions = [];
      const data = await getLions(address);
      for (let i = 0; i < data.length; i++) {
        lions.push({ id: data[i] });
      }
      if (data) {
        setMyLions(lions);
      }
    };
    if (isConnected) {
      fetchLions(address);
    }
  }, [address, isConnected]);

  useEffect(() => {
    const fetchButts = async () => {
      const butts = [];
      const data = await getButts(address);
      for (let i = 0; i < data.length; i++) {
        butts.push({ id: data[i] });
      }
      if (data) {
        setMyButts(butts);
      }
    };
    if (isConnected) {
      fetchButts();
      setRefreshButts(false);
    }
  }, [myLions, refreshButts]);

  useEffect(() => {
    let total = 0;
    total =
      Math.round((price * selectedLions.length + Number.EPSILON) * 100) / 100;
    total =
      allowListActive && isAllowListed && myButts.length < 1
        ? total - price / 2 < 0
          ? 0
          : total - price / 2
        : total;
    total = total.toFixed(2);
    setTotalPrice(total);
  }, [selectedLions, setTotalPrice, isAllowListActive, myButts]);

  const handleLionClick = (lion) => {
    const lionIndex = selectedLions.findIndex((l) => l.id === lion.id);
    if (lionIndex === -1) {
      if (selectedLions.length === 5) {
        return;
      }
      setSelectedLions([...selectedLions, lion]);
    } else {
      const newSelectedLions = selectedLions.filter((l) => l.id !== lion.id);
      setSelectedLions(newSelectedLions);
    }
  };

  return (
    <div className="claim">
      {isClaiming || isClaimed ? (
        <ClaimModal
          isMobile={isMobile}
          isClaiming={isClaiming}
          isClaimed={isClaimed}
          setIsClaiming={setIsClaiming}
          setIsClaimed={setIsClaimed}
        />
      ) : null}
      <ClaimHeader />
      <ClaimInfo
        address={address}
        allowListActive={allowListActive}
        isAllowListed={isAllowListed}
      />
      <div className="claim-area">
        <div className="claim-area-title">
          <h2>Pick Your Butt</h2>
        </div>
        <div className="claim-area-main">
          <MyLionsSection
            isConnected={isConnected}
            myLions={myLions}
            handleLionClick={handleLionClick}
            selectedLions={selectedLions}
            address={address}
            myButts={myButts}
            setIsClaiming={setIsClaiming}
            setRefreshButts={setRefreshButts}
            setIsClaimed={setIsClaimed}
            mintActive={mintActive}
          />
          <ClaimAreaMiddle selectedLions={selectedLions} />
          <ClaimAreaRight
            selectedLions={selectedLions}
            myLions={myLions}
            totalPrice={totalPrice}
            price={price}
            isConnected={isConnected}
            allowListActive={allowListActive}
            mintActive={mintActive}
            isAllowListed={isAllowListed}
            proof={proof}
            setIsClaiming={setIsClaiming}
            setRefreshButts={setRefreshButts}
            setSelectedLions={setSelectedLions}
            setIsClaimed={setIsClaimed}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

Claim.propTypes = {
  isMobile: PropType.bool.isRequired,
  setActivePage: PropType.func.isRequired,
  myLions: PropType.array.isRequired,
  setMyLions: PropType.func.isRequired,
};

export default Claim;
