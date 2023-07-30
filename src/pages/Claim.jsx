const Claim = ({ isMobile }) => {
    return (
        <div className="claim">
            <div className="main">
                <div className="claim-title">
                    <h1>Claim Your Butts</h1>
                </div>
                <div className="claim-info">
                    <p>Claiming your Lazy Butts NFTs is a straightforward process. Begin by selecting the Lazy Lion NFTs for which you'd like to claim Butts. After selection, click the "Claim Butts" button. Following this, you'll be asked to sign a transaction in order to claim your Butts.</p>
                    <p>Upon transaction confirmation, your newly claimed Butts will appear in your wallet. Please make sure to revisit our website after claiming. Here, you can download your high-resolution Lazy Butts NFTs along with your full-body Lion NFTs and other exclusive items. However, note that full-body Lion downloads are only available if you own both the corresponding Lazy Lions and Lazy Butts NFTs.</p>
                </div>
                <div className="claim-area">
                    <div className="claim-area-title">
                        <h2>Claim Area</h2>
                    </div>
                    <div className="claim-area-main">
                        {/* Need to divide this area into two parts. Large part on left, small part on right*/}
                        <div className="claim-area-left">
                            <div className="claim-area-left-title">
                                <h3>Lazy Lions</h3>
                            </div>
                            <div className="claim-area-left-info">
                                <p>0/0</p>
                            </div>
                        </div>
                        <div className="claim-area-right">
                            <div className="claim-area-right-title">
                                <h3>Lazy Butts</h3>
                            </div>
                            <div className="claim-area-right-info">
                                <p>0/0</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Claim