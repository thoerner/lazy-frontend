import { useState, useEffect, useCallback } from "react"
import { useAccount, useSignMessage } from "../utils/w3m.js"
import { getButts, verifySignature, getToken, checkSession, getSmallButtImage } from "../utils/api.js"
import { getSessionToken, createSessionToken } from "../utils/session.js"
import { MESSAGE_PREFIX } from "../utils/constants.js"
import { SignMessage, ClaimMessage, ConnectMessage } from "../components/ButtMessages.jsx"
import ButtGrid from "../components/ButtGrid.jsx"
import Disclaimer from "../components/Disclaimer.jsx"

const MyButts = ({ setActivePage, authenticated, setAuthenticated }) => {
    const [token, setToken] = useState('')
    const [message, setMessage] = useState('')
    const [signingMessage, setSigningMessage] = useState(false)
    const [retrySign, setRetrySign] = useState(false)
    const [signature, setSignature] = useState('')
    const { address, isConnected } = useAccount()
    const [sessionToken, setSessionToken] = useState()
    const [myButts, setMyButts] = useState([])
    const [buttImages, setButtImages] = useState([])
    const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage({ message })

    // Determine whether to request a message signature.
    const shouldRequestSignMessage = () => {
        return !authenticated && myButts.length > 0 && token && !signingMessage
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
    }, [token, myButts, authenticated, signingMessage, retrySign])

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
        if (isConnected) {
            fetchButts(address)
            fetchToken(address)
        }
    }, [isConnected, address])

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
        if (isConnected && !authenticated && myButts.length > 0) return <SignMessage handleSignClick={handleSignClick} />

        return <ButtGrid butts={myButts} buttImages={buttImages} />
    }

    return (
        <div className="myButts">
            <h1>My Lazy Butts</h1>
            <Disclaimer />
            {renderContent()}
        </div>
    )
}

export default MyButts