import PropType from "prop-types";
import Disclaimer from "./Disclaimer";
import EarlyAccessMessage from "./EarlyAccessMessage";
import { useIsMobile } from "../utils/tools";

const ClaimInfo = ({ address, allowListActive, isAllowListed }) => {
  const isMobile = useIsMobile();
  return (
    <div className="claim-info">
      {isMobile ? (
        <>
          <p>
            To claim your Lazy Butts NFTs, choose the Lazy Lion NFTs you want
            and click &quot;Claim Butts&quot;. You&apos;ll then sign a
            transaction to get your Butts.
          </p>
          <p>
            Once confirmed, the Butts will be in your wallet. After claiming,
            return to our site to download high-res Lazy Butts images and other
            items. Remember, you can only download full-body Lion images if you
            own both Lazy Lions and Lazy Butts NFTs.
          </p>
        </>
      ) : (
        <>
          <p>
            Claiming your Lazy Butts NFTs is a straightforward process. Begin by
            selecting the Lazy Lion NFTs for which you&apos;d like to claim
            Butts. After selection, click the &quot;Claim Butts&quot; button.
            Following this, you&apos;ll be asked to sign a transaction in order
            to claim your Butts.
          </p>
          <p>
            Upon transaction confirmation, your newly claimed Butts will appear
            in your wallet. Please make sure to revisit our website after
            claiming. Here, you can download your high-resolution Lazy Butts
            NFTs along with your full-body Lion NFTs and other exclusive items.
            However, note that full-body Lion downloads are only available if
            you own both the corresponding Lazy Lions and Lazy Butts NFTs.
          </p>
        </>
      )}
      <Disclaimer />
      {allowListActive && (
        <EarlyAccessMessage address={address} isAllowListed={isAllowListed} />
      )}
    </div>
  );
};

ClaimInfo.propTypes = {
  address: PropType.string,
  allowListActive: PropType.bool,
  isAllowListed: PropType.bool,
};

export default ClaimInfo;
