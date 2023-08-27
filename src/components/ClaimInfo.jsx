import Disclaimer from './Disclaimer'
import EarlyAccessMessage from './EarlyAccessMessage'

const ClaimInfo = ({ address, allowListActive, isAllowListed }) => {
    return (
        <div className="claim-info">
            <p>Claiming your Lazy Butts NFTs is a straightforward process. Begin by selecting the Lazy Lion NFTs for which you'd like to claim Butts. After selection, click the "Claim Butts" button. Following this, you'll be asked to sign a transaction in order to claim your Butts.</p>
            <p>Upon transaction confirmation, your newly claimed Butts will appear in your wallet. Please make sure to revisit our website after claiming. Here, you can download your high-resolution Lazy Butts NFTs along with your full-body Lion NFTs and other exclusive items. However, note that full-body Lion downloads are only available if you own both the corresponding Lazy Lions and Lazy Butts NFTs.</p>
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