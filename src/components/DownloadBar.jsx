import { useEffect, useState } from 'react'
import { getFullResButtImage, getFullBodyImage, getFullBodyThumbImage, getMediumButtImage } from '../utils/api.js'
import { getSessionToken } from '../utils/session.js'
import { useIsMobile } from '../utils/tools.js'
import { useAccount } from 'wagmi'
import toast from 'react-hot-toast'
import '../styles/DownloadButton.css'

// button for downloading butt images
const DownloadBar = ({ butt, setButtImage, setIsLoading, selectedType, setSelectedType, myLions }) => {
    const isMobile = useIsMobile()
    const [blobs, setBlobs] = useState({}) // TODO: change to preview blobs and then when download is clicked, download the full res
    const { address } = useAccount()
    const sessionToken = getSessionToken()

    useEffect(() => {
        const fetchButtImage = async () => {
            const mediumBlob = await getMediumButtImage(butt.id)
            setBlobs({ 'medium': mediumBlob })
        }
        fetchButtImage()
    }, [butt, address, sessionToken])

    const handleDownloadClick = async () => {
        await downloadBlob(selectedType)
    }

    const downloadBlob = async (type) => {
        downloadImage(butt.id, type, `lazy-butt_${type}_${butt.id}.png`, address, sessionToken)
    }

    const setImage = (imageBlob) => {
        const buttImage = URL.createObjectURL(imageBlob)
        setButtImage(buttImage)
    }

    const handleMediumButtonClick = async () => {
        setIsLoading(true)
        setSelectedType('medium')
        if (blobs['medium']) {
            setImage(blobs['medium'])
        } else {
            const mediumBlob = await getMediumButtImage(butt.id)
            setBlobs({ ...blobs, 'medium': mediumBlob })
            setImage(mediumBlob)
        }
        setIsLoading(false)
    }

    const handleFullResButtonClick = async () => {
        setIsLoading(true)
        setSelectedType('full-res')
        if (blobs['full-res']) {
            setImage(blobs['full-res'])
        } else {
            const fullResBlob = await getMediumButtImage(butt.id)
            setBlobs({ ...blobs, 'full-res': fullResBlob })
            setImage(fullResBlob)
        }
        setIsLoading(false)
    }

    const handleFullBodyButtonClick = async () => {
        console.log(myLions)
        if (!myLions.some(lion => lion.id === butt.id)) {
            toast(<div style={{
                display: "flex", 
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                }}>
                You must own Lazy Lion #{butt.id} to download the Full Body image!<br />
                <a href={`https://opensea.io/assets/ethereum/0x8943c7bac1914c9a7aba750bf2b6b09fd21037e0/${butt.id}`} target="_blank" rel="noreferrer">
                    <div style={{backgroundColor: '#00caf8aa', borderRadius: '0.5rem', height: '2rem', lineHeight: '2rem', padding: '0.5rem 1rem', marginTop: '0.5rem', border: '1px solid #00caf8'}}>Buy on OpenSea</div>
                </a>
            </div>)
            return
        }
        setIsLoading(true)
        setSelectedType('full-body')
        if (blobs['full-body']) {
            setImage(blobs['full-body'])
        } else {
            const fullBodyBlob = await getFullBodyThumbImage(butt.id, address, sessionToken)
            setBlobs({ ...blobs, 'full-body': fullBodyBlob })
            setImage(fullBodyBlob)
        }
        setIsLoading(false)
    }

    const downloadImage = async (buttId, type, fileName, address, sessionToken) => {
        const getImage = type === 'full-res' ? getFullResButtImage : type === 'full-body' ? getFullBodyImage : getMediumButtImage

        function createTempAnchor(url, filename) {
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }

        const downloadToast = toast.promise(
            address && sessionToken ? getImage(buttId, address, sessionToken) : getImage(buttId),
            {
                loading: 'Downloading...',
                success: 'Download complete!',
                error: 'Download failed'
            }
        ).then((imageBlob) => {
            const url = window.URL.createObjectURL(imageBlob);
            createTempAnchor(url, fileName);
            window.URL.revokeObjectURL(url);  // Free up memory
        })
    }

    return (
        <div className="downloadBar">
            <div className={`downloadButtonDropdownItem ${selectedType === 'medium' ? 'selected' : null}`}
                onClick={() => handleMediumButtonClick(butt.id)} >
                Original {!isMobile ? `(2k × 2k)` : null}
            </div>
            <div className={`downloadButtonDropdownItem ${selectedType === 'full-res' ? 'selected' : null}`}
                onClick={() => handleFullResButtonClick()}
            >
                Full Res {!isMobile ? `(8k × 8k)` : null}
            </div>
            <div className={`downloadButtonDropdownItem ${selectedType === 'full-body' ? 'selected' : null}`}
                onClick={() => handleFullBodyButtonClick()}
            >
                Full Body {!isMobile ? `(8k × 16k)` : null}
            </div>
            <div className="downloadButtonDropdownItem download"
                onClick={() => handleDownloadClick()}
            >
                Download
            </div>
        </div>
    )
}

export default DownloadBar;