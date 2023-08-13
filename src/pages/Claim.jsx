import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import SparkleOverlay from '../components/SparkleOverlay'
import Logo from '../assets/lazybutts.png'
import EmptyLion from '../assets/lion-silhouette.png'
import { useAccount } from '../utils/w3m.js'
import { getLions, getButts } from '../utils/api.js'
import RandomQuote from '../components/RandomQuote'
import MintButton from '../components/MintButton'
import toast from 'react-hot-toast'
import Disclaimer from '../components/Disclaimer'
import { getSmallButtImage } from '../utils/api.js'
import { getSessionToken } from "../utils/session.js"
import Footer from '../components/Footer'

const MyLions = ({ lions, butts, handleLionClick, selectedLions, address }) => {
    const [buttImages, setButtImages] = useState([
        { id: 1, image: EmptyLion },
    ])

    useEffect(() => {
        const fetchButtImages = async () => {
            const buttImagesPromises = butts.map(async butt => {
                const imageBlob = await getSmallButtImage(butt.id, address, getSessionToken());
                const imageUrl = URL.createObjectURL(imageBlob);
                return {
                    id: butt.id,
                    image: imageUrl
                };
            });

            const buttImages = await Promise.all(buttImagesPromises);
            setButtImages(buttImages);
        };

        fetchButtImages();
    }, [butts]);


    const lionList = lions.map(lion => {
        const isClaimed = butts.some(butt => butt.id === lion.id);
        console.log(selectedLions)
        const isSelected = selectedLions.some(selectedLion => selectedLion.id === lion.id);
        const clickHandler = isClaimed ? undefined : () => handleLionClick(lion);

        const sessionToken = getSessionToken()
        console.log(`sessionToken: ${sessionToken}`)

        const buttImage = buttImages.find(buttImage => buttImage.id === lion.id)?.image ?? EmptyLion;

        console.log(buttImage.size, buttImage.type)

        return (
            <div
                className={`my-lion ${isClaimed ? 'claimed' : ''} ${isSelected ? 'selected' : ''}`}
                key={lion.id}
                onClick={clickHandler}
            >
                <div className="my-lion-image">
                    <img
                        src={`https://lazybutts.s3.amazonaws.com/public/images/small-lazy-lions/${lion.id}.png`}
                        alt="lion"
                        className="default-image"
                    />
                    {isClaimed &&
                        <div className="overlay-container">
                            <img src={buttImage} alt="lion" className="hover-image" />
                            <div className="overlay-text">CLAIMED</div>
                        </div>
                    }
                </div>

                <div className="my-lion-info">
                    <p className="my-lion-id">Lazy Lions #{lion.id}</p>
                </div>

            </div>
        );
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
    const [myLions, setMyLions] = useState([])
    const [myButts, setMyButts] = useState([])
    const [selectedLions, setSelectedLions] = useState([])
    const [price, setPrice] = useState(0.02)
    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        setActivePage('claim')
    }, [setActivePage])

    useEffect(() => {
        const fetchButts = async (address) => {
            const butts = []
            const data = await getButts(address)
            for (let i = 0; i < data.length; i++) {
                butts.push({ id: data[i] })
            }
            if (data) {
                setMyButts(butts)
            }
        }
        const fetchLions = async (address) => {
            const lions = []
            const data = await getLions(address)
            for (let i = 0; i < data.length; i++) {
                lions.push({ id: data[i] })
            }
            if (data) {
                setMyLions(lions)
            }
        }
        if (isConnected) {
            fetchButts(address)
            fetchLions(address)
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
                    <Disclaimer />
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
                                            <img src={EmptyLion} alt="Empty Lion" style={{ maxWidth: '250px' }} />
                                        </div>
                                        :
                                        isConnected ?
                                            <MyLions
                                                lions={myLions}
                                                butts={myButts}
                                                handleLionClick={handleLionClick}
                                                selectedLions={selectedLions}
                                                address={address}
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
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Claim