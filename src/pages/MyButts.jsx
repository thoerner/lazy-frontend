import { useState, useEffect } from "react"
import { useAccount, useSignMessage } from "../utils/w3m.js"
import { Link } from "react-router-dom"
import WalletConnectButton from "../components/WalletConnectButton.jsx"
import Cookies from 'js-cookie'

const SESSION_EXPIRY_TIME = 3600; // 1 hour in seconds

const DownloadButton = ({ butt }) => {
    const [fullResButtUrl, setFullResButtUrl] = useState('')
    const [fullBodyUrl, setFullBodyUrl] = useState('')
    const [twitterFriendlyUrl, setTwitterFriendlyUrl] = useState('')
    const [dropdownOpen, setDropdownOpen] = useState(false)

    const handleDropdownClick = () => {
        setDropdownOpen(!dropdownOpen)
    }

    const handleDownloadClick = () => {
        setDropdownOpen(false)
    }

    // download button with dropdown menu
    return (
        <div className="downloadButton">
            <div className="downloadButtonInnerFirst"
                onClick={handleDownloadClick}
            ><a href="#">Download</a></div>
            <div className="downloadButtonInner"
                onClick={handleDropdownClick}
            >
                <div className="downloadButtonIcon">
                    <i className="fas fa-download"></i>
                </div>
                <div className="downloadButtonLabel">
                    {dropdownOpen ? '<' : '>'}
                </div>
            </div>
            <div className={`downloadButtonDropdown ${dropdownOpen ? 'open' : null}`}>
                <div className="downloadButtonDropdownItem">
                    <a href={fullResButtUrl} download>
                        Full Resolution Butt
                    </a>
                </div>
                <div className="downloadButtonDropdownItem">
                    <a href={fullBodyUrl} download>
                        Full Body
                    </a>
                </div>
                <div className="downloadButtonDropdownItem">
                    <a href={twitterFriendlyUrl} download>
                        Twitter Friendly
                    </a>
                </div>
            </div>
        </div>
    )
}

const ButtModal = ({ butt, setModalOpen }) => {

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                setModalOpen(false)
            }
        }
        window.addEventListener('keydown', handleEscape)
        return () => {
            window.removeEventListener('keydown', handleEscape)
        }
    }, [setModalOpen])

    const handleModalClose = () => {
        setModalOpen(false)
    }

    return (
        <>
            <div className="buttModalOverlay"></div>
            <div className="buttModal">
                <div className="buttModalContent">
                    <div className="buttModalClose"
                        onClick={handleModalClose}
                    >
                        <div className="buttModalCloseInner">
                            x
                        </div>
                    </div>
                    <h3>Butt #{butt.id}</h3>
                    <img src={`https://lazybutts.s3.amazonaws.com/public/images/silhouettes/${butt.id}.png`} alt="Lazy Butts" />
                    <DownloadButton butt={butt} />
                </div>
            </div>
        </>
    )
}

const ButtCard = ({ butt }) => {
    const [modalOpen, setModalOpen] = useState(false)

    const handleButtClick = () => {
        setModalOpen(true)
    }


    return (
        <>
            {modalOpen && <ButtModal butt={butt} setModalOpen={setModalOpen} />}
            <div className="buttCard">
                <i
                    className="fas fa-butt"
                    style={{ fontSize: "100px", color: "white" }}
                ></i>
                <h3>Butt #{butt.id}</h3>
                <img src={`https://lazybutts.s3.amazonaws.com/public/images/silhouettes/${butt.id}.png`} alt="Lazy Butts"
                    onClick={handleButtClick}
                />
            </div>
        </>
    )
}

const ButtGrid = ({ butts }) => {

    const buttCards = butts.map((butt) => {
        return (
            <ButtCard butt={butt} key={butt.id} />
        )
    })

    return (
        <div className="buttGrid">
            {buttCards}
        </div>
    )
}

const MyButts = ({ setActivePage, authenticated, setAuthenticated }) => {
    const [token, setToken] = useState('')
    const [message, setMessage] = useState('')
    const [shouldSignMessage, setShouldSignMessage] = useState(false)
    const [signature, setSignature] = useState('')
    const { address, isConnected } = useAccount()
    const [sessionToken, setSessionToken] = useState()
    const [myLions, setMyLions] = useState([
        // { id: 1 },
    ])
    const [myButts, setMyButts] = useState([
        // { id: 1 },
    ])
    const [selectedLions, setSelectedLions] = useState([])
    const [price, setPrice] = useState(0.02)
    const [totalPrice, setTotalPrice] = useState(0)

    const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage({ message })

    useEffect(() => {
        const sessionToken = Cookies.get('sessionToken')
        if (sessionToken) {
            setSessionToken(sessionToken)
        }
    }, [])

    useEffect(() => {
        // check if sessionToken is valid using api
        const checkSessionToken = async () => {
            const params = {
                address,
                sessionToken
            }
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/check`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(params)
            })
            const data = await res.json()
            if (data.success) {
                setAuthenticated(true)
                Cookies.set('sessionToken', sessionToken, {
                    expires: SESSION_EXPIRY_TIME / (24 * 60 * 60),  // Convert to days for js-cookie
                    path: '/',
                    secure: true,
                    sameSite: 'strict'
                });
            } else {
                setAuthenticated(false)
            }
        }
        if (sessionToken) {
            checkSessionToken()
        }
    }, [sessionToken, address])

    useEffect(() => {
        if (authenticated) return
        if (signature) {
            // send signature to api
            const verifySignature = async () => {
                const params = {
                    token,
                    signature,
                    address
                }
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/verify`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(params)
                })
                const data = await res.json()
                if (data.success) {
                    setAuthenticated(true)
                    setSessionToken(data.sessionToken)
                } else {
                    setAuthenticated(false)
                }
            }
            verifySignature()
        }
    }, [signature])

    useEffect(() => {
        if (isSuccess) {
            setSignature(data)
        }
    }, [data, isError, isLoading, isSuccess])

    useEffect(() => {
        if (authenticated || myButts.length === 0) return
        if (shouldSignMessage) {
            signMessage();
            setShouldSignMessage(false);
        }
    }, [shouldSignMessage])

    useEffect(() => {
        if (isConnected) {
            // fetch token from api
            const getToken = async () => {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/token?address=${address}`)
                const data = await res.json()
                if (data) {
                    setToken(data.token)
                }
            }
            getToken()
        }
    }, [isConnected, address])

    useEffect(() => {
        if (!token) return
        setMessage(
            `You must sign this message to prove ownership of your wallet address.\nBy signing this message, you agree to Lazy Butt's Terms of Service and acknowledge that we use cookies to keep you logged in.\n${token}`
        )
        setShouldSignMessage(true)
    }, [token])

    useEffect(() => {
        setActivePage('butts')
    }, [setActivePage])

    useEffect(() => {
        if (isConnected) {
            const getLions = async () => {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/lions/${address}`)
                let lions = []
                const data = await res.json()
                for (let i = 0; i < data.length; i++) {
                    lions.push({ id: data[i] })
                }
                if (data) {
                    setMyLions(lions)
                    setMyButts(lions) // TODO: fix this
                }
            }
            getLions()
        }
    }, [address, isConnected])

    const handleSignClick = () => {
        setShouldSignMessage(true)
    }

    return (
        <div>
            <h1>My Lazy Butts</h1>
            {!isConnected && (
                <div className="connectMessage">
                    <p>
                        To view your Lazy Butts, please connect your wallet.
                    </p>
                    <br />
                    <WalletConnectButton />
                </div>
            )}
            {isConnected && myButts.length === 0 ? (
                <div className="connectMessage">
                    <p>
                        You don't have any Lazy Butts yet.
                    </p>
                    <br />
                    <Link to="/claim">
                        <button className="button">Claim a Lazy Butt</button>
                    </Link>
                </div>
            ) : null}
            {isConnected && authenticated && myButts.length > 0 ? (
                <ButtGrid butts={myButts} />
            ) : isConnected && myButts.length > 0 ? (
                <div className="signMessage">
                    <p>
                        To view your Lazy Butts, please sign a message with your wallet.
                    </p>
                    <p>
                        <button
                            className="button"
                            onClick={handleSignClick}
                        >Sign Message</button>
                    </p>
                    {/* <div className="message">
                        <p>Message:</p>
                        {message}
                    </div>
                    <div className="signature">
                        <p>Signature:</p>
                        {signature}
                    </div> */}
                </div>
            ) : null}
        </div>
    )
}

export default MyButts