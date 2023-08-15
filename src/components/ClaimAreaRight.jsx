import MintButton from '../components/MintButton'
import RandomQuote from '../components/RandomQuote'

const ClaimAreaRight = ({ selectedLions, myLions, totalPrice, price, isConnected }) => {
    return (
        <div className="claim-area-right">
            <div className="claim-area-right-title">
                <h3>Claim Lazy Butts</h3>
                {myLions.length > 0 && isConnected ?
                    <p style={{ color: selectedLions.length === 5 ? '#00caf8' : '#aaa' }}>{selectedLions.length}/5 selected</p>
                    :
                    null
                }
            </div>
            <div className="claim-area-right-info">
                <p>{totalPrice} ETH</p>
                <MintButton selectedLions={selectedLions} />
                <p style={{ fontSize: '0.8rem' }}>
                    Lazy Butts are priced at {price} ETH each. You can claim up to 5 Butts per transaction.
                </p>
                <p style={{ fontSize: '0.8rem' }}>
                    Note that you must own the corresponding Lazy Lions NFTs in order to claim Lazy Butts.
                </p>
                <RandomQuote />
            </div>
        </div>
    )
}

export default ClaimAreaRight