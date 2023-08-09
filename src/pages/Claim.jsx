import { useState, useEffect } from 'react'
import SparkleOverlay from '../components/SparkleOverlay'
import Logo from '../assets/lazybutts.png'
import { useAccount } from '../utils/w3m.js'
import RandomQuote from '../components/RandomQuote'

const MyLions = ({ lions, handleLionClick, selectedLions }) => {
    const lionList = lions.map(lion => {
        return (
            <div className={`my-lion ${selectedLions.findIndex(l => l.id === lion.id) !== -1 ? 'selected' : null}`} key={lion.id} onClick={() => handleLionClick(lion)}>
                <img src={`https://lazybutts.s3.amazonaws.com/public/images/small-lazy-lions/${lion.id}.png`} alt="lion" />
                <div className="my-lion-info">
                    <p className="my-lion-id">Lazy Lions #{lion.id}</p>
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

const Silhouette = ({ lionId, isTwinkling }) => {
    return (
        <>
            <div className="silhouette-card-image-top">
                <img src={`https://lazybutts.s3.amazonaws.com/public/images/small-lazy-lions/${lionId}.png`} alt="lion" />
            </div>
            <div className="silhouette-card-image-bottom">
                <SparkleOverlay
                    baseImageUrl={`https://lazybutts.s3.amazonaws.com/public/images/silhouettes/${lionId}.png`}
                    isTwinkling={isTwinkling}
                />
            </div>
        </>
    )
}

const Claim = ({ isMobile, setActivePage }) => {
    const { address, isConnected } = useAccount()
    const [myLions, setMyLions] = useState([
        // { id: 1 },
    ])
    const [selectedLions, setSelectedLions] = useState([])
    const [price, setPrice] = useState(0.02)
    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        setActivePage('claim')
    }, [setActivePage])

    useEffect(() => {
        if (isConnected) {
            const getLions = async () => {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/lions/${address}`)
                let lions = []
                const data = await res.json()
                for (let i = 0; i < data.length; i++) {
                    lions.push({id: data[i]})
                }
                if (data) {
                    setMyLions(lions)
                }
            }
            getLions()
        }
    }, [address, isConnected])

    useEffect(() => {
        let total = 0
        total = Math.round(((price * selectedLions.length) + Number.EPSILON) * 100) / 100
        setTotalPrice(total)
    }, [selectedLions, setTotalPrice])

    const handleLionClick = (lion) => {
        const lionIndex = selectedLions.findIndex(l => l.id === lion.id)
        if (lionIndex === -1) {
            if (selectedLions.length === 5) {
                return
            }
            setSelectedLions([...selectedLions, lion])
        } else {
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
                        <h2>Pick Your Butt</h2>
                    </div>
                    <div className="claim-area-main">
                        <div className="claim-area-left">
                            <div className="claim-area-left-title">
                                <h3>My Lazy Lions</h3>
                                {myLions.length > 0 && isConnected ?
                                    <p style={{ color: selectedLions.length === 5 ? '#00caf8' : '#aaa', fontSize: "1rem" }}>{selectedLions.length === 5 ? `Max Lions Selected` : `Choose Your Lion(s)`}</p>
                                    :
                                    null
                                }
                            </div>
                            <div className="claim-area-left-info">
                                <div className="my-lions-container">
                                    {isConnected && myLions.length === 0 ?
                                        <div className="my-lions-empty">
                                            <p>You don't own any Lazy Lions yet.</p>
                                            <p>Head over to the <a href="https://opensea.io/collection/lazy-lions" target='_blank' rel="noreferrer">Lazy Lions OpenSea</a> page to find some.</p>
                                        </div>
                                        :
                                        isConnected ?
                                        <MyLions
                                            lions={myLions}
                                            handleLionClick={handleLionClick}
                                            selectedLions={selectedLions}
                                        />
                                        :
                                        <div className="my-lions-empty">
                                            <p>Connect your wallet to view your Lazy Lions.</p>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="claim-area-middle">
                            <img src={Logo} alt="Lazy Butts"
                                style={{
                                    width: '100%',
                                    maxWidth: '25%',
                                    position: 'absolute',
                                    opacity: selectedLions.length === 0 ? 1 : 0.15,
                                }}
                            />
                            {selectedLions.length > 4 ?
                                <div className="silhouette-card stacked-four">
                                    <Silhouette
                                        lionId={selectedLions[4].id}
                                        isTwinkling={true}
                                    />
                                </div>
                                :
                                null
                            }
                            {selectedLions.length > 3 ?
                                <div className="silhouette-card stacked-three">
                                    <Silhouette
                                        lionId={selectedLions[3].id}
                                        isTwinkling={selectedLions.length < 5 ? true : false}
                                    />
                                </div>
                                :
                                null
                            }
                            {selectedLions.length > 2 ?
                                <div className="silhouette-card stacked-two">
                                    <Silhouette
                                        lionId={selectedLions[2].id}
                                        isTwinkling={selectedLions.length < 4 ? true : false}
                                    />
                                </div>
                                :
                                null
                            }
                            {selectedLions.length > 1 ?
                                <div className="silhouette-card stacked-one">
                                    <Silhouette
                                        lionId={selectedLions[1].id}
                                        isTwinkling={selectedLions.length < 3 ? true : false}
                                    />
                                </div>
                                :
                                null
                            }
                            {selectedLions.length > 0 ?
                                <div className="silhouette-card">
                                    <Silhouette
                                        lionId={selectedLions[0].id}
                                        isTwinkling={selectedLions.length < 2 ? true : false}
                                    />
                                </div>
                                :
                                null}

                        </div>
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
                                <button>{selectedLions.length > 1 ? 'Claim Butts' : selectedLions.length > 0 ? 'Claim Butt' : 'Claim Butt'}</button>
                                <p>
                                    Lazy Butts are priced at {price} ETH each. You can claim up to 5 Butts per transaction.
                                </p>
                                <p>
                                    Note that you must own the corresponding Lazy Lions NFTs in order to claim Lazy Butts.
                                </p>
                                <RandomQuote />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Claim