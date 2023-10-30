import PropType from 'prop-types'
import MintButton from '../components/MintButton'
import RandomQuote from '../components/RandomQuote'

const ClaimAreaRight = ({
    selectedLions,
    myLions,
    totalPrice,
    price,
    isConnected,
    allowListActive,
    mintActive,
    isAllowListed,
    proof,
    setIsClaiming,
    setRefreshButts,
    setSelectedLions,
    setIsClaimed,
}) => {
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
                <MintButton
                    selectedLions={selectedLions}
                    allowListActive={allowListActive}
                    isAllowListed={isAllowListed}
                    totalPrice={totalPrice}
                    proof={proof}
                    setIsClaiming={setIsClaiming}
                    setRefreshButts={setRefreshButts}
                    setSelectedLions={setSelectedLions}
                    setIsClaimed={setIsClaimed}
                    mintActive={mintActive}
                />
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

ClaimAreaRight.propTypes = {
    selectedLions: PropType.array,
    myLions: PropType.array,
    totalPrice: PropType.number,
    price: PropType.number,
    isConnected: PropType.bool,
    allowListActive: PropType.bool,
    mintActive: PropType.bool,
    isAllowListed: PropType.bool,
    proof: PropType.object,
    setIsClaiming: PropType.func,
    setRefreshButts: PropType.func,
    setSelectedLions: PropType.func,
    setIsClaimed: PropType.func,
}

export default ClaimAreaRight