import { useState, useEffect, useCallback } from "react"
import { useAccount, useSignMessage } from "../utils/w3m.js"
import { getLions, getButts, verifySignature, getToken, checkSession, getSmallButtImage } from "../utils/api.js"
import { getSessionToken, createSessionToken } from "../utils/session.js"
import { MESSAGE_PREFIX } from "../utils/constants.js"
import { useIsMobile } from "../utils/tools.js"
import { SignMessage, ClaimMessage, ConnectMessage } from "../components/ButtMessages.jsx"
import ButtGrid from "../components/ButtGrid.jsx"
import Disclaimer from "../components/Disclaimer.jsx"
import Footer from "../components/Footer.jsx"

const { VITE_ENV } = import.meta.env

const LoadingMessage = () => {
    return (
        <div className="loading-message">
            <div className="loading"></div>
        </div>
    )
}

const MyButts = ({ setActivePage, authenticated, setAuthenticated, myLions, setMyLions }) => {
    const isMobile = useIsMobile()
    const [token, setToken] = useState('')
    const [message, setMessage] = useState('')
    const [signingMessage, setSigningMessage] = useState(false)
    const [retrySign, setRetrySign] = useState(false)
    const [signature, setSignature] = useState('')
    const { address, isConnected } = useAccount()
    const [sessionToken, setSessionToken] = useState()
    const [myButts, setMyButts] = useState([])
    const [buttImages, setButtImages] = useState([])
    const [isLoadingPage, setIsLoadingPage] = useState(true)
    const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage({ message })


    // Determine whether to request a message signature.
    const shouldRequestSignMessage = () => {
        return !authenticated && myButts.length > 0 && token !== '' && !signingMessage
    }

    // Handle the sign message button click.
    const handleSignClick = useCallback(() => {
        setSigningMessage(false);
        setRetrySign(prev => !prev);
    }, []);

    // Initialize session token from local storage on component mount.
    useEffect(() => {
        const sessionToken = getSessionToken()
        if (sessionToken) {
            setSessionToken(sessionToken)
        }
    }, [])

    // After a session token is set or the address changes, verify its validity.
    useEffect(() => {
        const checkSessionToken = async () => {
            const params = {
                address,
                sessionToken
            }
            const data = await checkSession(params)
            if (data.success) {
                setAuthenticated(true)
                createSessionToken(sessionToken)
            } else {
                setAuthenticated(false)
            }
        }
        if (sessionToken) {
            checkSessionToken()
        }
    }, [sessionToken, address])

    // Once a signature is provided, verify it to authenticate the user.
    useEffect(() => {
        if (authenticated) return
        const verify = async (token, signature, address) => {
            const data = await verifySignature(token, signature, address)
            if (data.success) {
                setAuthenticated(true)
                setSessionToken(data.sessionToken)
            } else {
                setAuthenticated(false)
            }
        }
        if (signature) {
            verify(token, signature, address)
        }
    }, [signature])

    // Update the signature state once the signing process succeeds.
    useEffect(() => {
        if (isSuccess) {
            setSignature(data)
        }
    }, [data, isError, isLoading, isSuccess])

    // Request message signing based on certain conditions.
    useEffect(() => {
        if (shouldRequestSignMessage()) {
            setSigningMessage(true)
            signMessage()
            setSigningMessage(false)
        }
    }, [token, authenticated, signingMessage, retrySign])

    // When the user connects their account, fetch their associated tokens and butts.
    useEffect(() => {
        const fetchToken = async (address) => {
            const data = await getToken(address)
            if (data) {
                setToken(data)
            }
        }
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
            console.log(`Fetching lions for ${address}`)
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
            fetchToken(address)
        }
    }, [isConnected, address])

    useEffect(() => {
        if (myButts.length > 0 && buttImages.length === myButts.length) {
            setIsLoadingPage(false)
        }
    }, [myButts, buttImages])

    // Fetch the small butt images for the user's butts.
    useEffect(() => {
        const fetchButtImages = async () => {
            const buttImagesPromises = myButts.map(async butt => {
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
    }, [myButts]);

    // Formulate the message for signing based on the token.
    useEffect(() => {
        if (!token) return
        setMessage(`${MESSAGE_PREFIX}${token}`)
    }, [token])

    // Set the active page to 'butts' when the component is rendered.
    useEffect(() => {
        setActivePage('butts')
    }, [setActivePage])

    // Render the appropriate content based on the user's state.
    const renderContent = () => {
        if (!isConnected) return <ConnectMessage />
        if (isConnected && myButts.length === 0) return <ClaimMessage />
        if (isLoadingPage) return <LoadingMessage />
        if (isConnected && !authenticated && myButts.length > 0) return <SignMessage handleSignClick={handleSignClick} />

        return <ButtGrid butts={myButts} buttImages={buttImages} myLions={myLions} />
    }

    return (
        <div className="myButts">
            <h1>My Lazy Butts</h1>
            {!isMobile ?
                <>
                    <p>Welcome to your personal collection of Lazy Butts. Here, you can view, manage, and interact with all the Lazy Butts you've claimed or acquired. Each unique asset is a testament to our vibrant and growing community. Dive in, explore your collection, and amplify the roar of the Pride.</p>
                    <p>It's important to note: While Lazy Butts owners enjoy exclusive access to the high-resolution Lazy Butt image and other potential assets, the Full Body artwork is a special privilege. To unlock the complete Full Body artwork, you must own BOTH the Lazy Butt AND the corresponding Lazy Lion. This pairing ensures a comprehensive and unique representation of your chosen character in the Pride.</p>
                </> : <>
                    <p>Welcome to your Lazy Butts collection! Browse and manage your unique assets, and join our thriving community. Dive into your collection and feel the Pride's roar.</p>
                    <p>Remember, only by owning both a Lazy Butt and its matching Lazy Lion can you access the full artwork. This combo fully showcases your Pride character.</p>
                </>}
            <Disclaimer />
            <div className="myButtsContent">
                {renderContent()}
            </div>
            <Footer />
        </div>
    )
}

export default MyButts