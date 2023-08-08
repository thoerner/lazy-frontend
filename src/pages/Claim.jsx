import { useState, useEffect } from 'react'
import DummyLion from '../assets/lion.jpeg'

const MyLions = ({ lions, handleLionClick, selectedLions }) => {
    const lionList = lions.map(lion => {
        return (
            <div className={`my-lion ${selectedLions.findIndex(l => l.id === lion.id) !== -1 ? 'selected' : null}`} key={lion.id} onClick={() => handleLionClick(lion)}>
                <img src={DummyLion} alt="lion" />
                <div className="my-lion-info">
                    <p className="my-lion-name">{lion.name}</p>
                    <p className="my-lion-id">ID: {lion.id}</p>
                </div>
            </div>
        )
    })

    return (
        <div className="my-lions">
            {lionList}
        </div>
    )
}

const Claim = ({ isMobile }) => {
    const [myLions, setMyLions] = useState([
        { id: 1, name: 'Lion 1' },
        { id: 2, name: 'Lion 2' },
        { id: 3, name: 'Lion 3' },
        { id: 4, name: 'Lion 4' },
        { id: 5, name: 'Lion 5' }
    ])
    const [selectedLions, setSelectedLions] = useState([])
    const [price, setPrice] = useState(0.05)
    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        let total = 0
        total = Math.round(((price * selectedLions.length) + Number.EPSILON) * 100) / 100
        setTotalPrice(total)
    }, [selectedLions, setTotalPrice])

    const handleLionClick = (lion) => {
        // check for matching lion object by id in selectedLions
        const lionIndex = selectedLions.findIndex(l => l.id === lion.id)
        if (lionIndex === -1) {
            // if lion not found, add to selectedLions
            setSelectedLions([...selectedLions, lion])
        } else {
            // if lion found, remove from selectedLions
            const newSelectedLions = selectedLions.filter(l => l.id !== lion.id)
            setSelectedLions(newSelectedLions)
        }
    }

    return (
        <div className="claim">
            <div className="main">
                <div className="claim-title">
                    <h1>Claim Lazy Butts</h1>
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
                        <div className="claim-area-left">
                            <div className="claim-area-left-title">
                                <h3>My Lazy Lions</h3>
                                <p>{selectedLions.length}/{myLions.length} selected</p>
                            </div>
                            <div className="claim-area-left-info">
                                <div className="my-lions-container">
                                    <MyLions
                                        lions={myLions}
                                        handleLionClick={handleLionClick}
                                        selectedLions={selectedLions}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="claim-area-middle">
                            <div className="claim-area-middle-title">
                                <h3>Lazy Butts</h3>
                            </div>
                            <div className="claim-area-middle-info">
                                <p>0/0</p>
                            </div>
                        </div>
                        <div className="claim-area-right">
                            <div className="claim-area-right-title">
                                <h3>Claim Butts</h3>
                            </div>
                            <div className="claim-area-right-info">
                                <p>{totalPrice} ETH</p>
                                <button>Claim Butts</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Claim