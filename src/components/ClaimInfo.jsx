import Disclaimer from './Disclaimer'
import EarlyAccessMessage from './EarlyAccessMessage'

const ClaimInfo = ({ address, allowListActive, isAllowListed }) => {
    return (
        <div className="claim-info">
            <p>To claim your Lazy Butts NFTs, choose the Lazy Lion NFTs you want and click "Claim Butts". You'll then sign a transaction to get your Butts.</p>
            <p>Once confirmed, the Butts will be in your wallet. After claiming, return to our site to download high-res Lazy Butts NFTs and other items. Remember, you can only download full-body Lion NFTs if you own both Lazy Lions and Lazy Butts NFTs.</p>
            <Disclaimer />
            {allowListActive &&
                <EarlyAccessMessage
                    address={address}
                    isAllowListed={isAllowListed}
                />
            }
        </div>
    )
}

export default ClaimInfo