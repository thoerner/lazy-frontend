import { useEffect, useState } from 'react'
import { getFullResButtImage, getFullBodyImage, getMediumButtImage } from '../utils/api.js'
import { getSessionToken } from '../utils/session.js'
import { useAccount } from 'wagmi'
import toast from 'react-hot-toast'
import '../styles/DownloadButton.css'

// button for downloading butt images
const DownloadButton = ({ butt, setButtImage, setIsLoading, selectedType, setSelectedType }) => {
    const [blobs, setBlobs] = useState({})
    const { address } = useAccount()
    const sessionToken = getSessionToken()

    useEffect(() => {
        const fetchButtImage = async () => {
            const mediumBlob = await getMediumButtImage(butt.id)
            setBlobs({ 'medium': mediumBlob })
        }
        fetchButtImage()
    }, [butt, address, sessionToken])

    const handleDownloadClick = () => {
        const downloadToast = toast.promise(
            downloadBlob(selectedType),
            {
                loading: 'Downloading...',
                success: 'Downloaded!',
                error: 'Error downloading :('
            })

        downloadToast.then(() => {
            console.log('Downloaded!')
        })
    }

    const downloadBlob = async (type) => {
        const imageBlob = blobs[type]
        const url = window.URL.createObjectURL(imageBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `lazy-butt_${type}_${butt.id}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);  // Free up memory
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
            const fullResBlob = await getFullResButtImage(butt.id, address, sessionToken)
            setBlobs({ ...blobs, 'full-res': fullResBlob })
            setImage(fullResBlob)
        }
        setIsLoading(false)
    }

    const handleFullBodyButtonClick = async () => {
        setIsLoading(true)
        setSelectedType('full-body')
        if (blobs['full-body']) {
            setImage(blobs['full-body'])
        } else {
            const fullBodyBlob = await getFullBodyImage(butt.id, address, sessionToken)
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
                Original (4k × 4k)
            </div>
            <div className={`downloadButtonDropdownItem ${selectedType === 'full-res' ? 'selected' : null}`}
                onClick={() => handleFullResButtonClick()}
            >
                Full Res (8k × 8k)
            </div>
            <div className={`downloadButtonDropdownItem ${selectedType === 'full-body' ? 'selected' : null}`}
                onClick={() => handleFullBodyButtonClick()}
            >
                Full Body (8k × 16k)
            </div>
            <div className="downloadButtonDropdownItem download"
                onClick={() => handleDownloadClick()}
            >
                Download
            </div>
        </div>
    )
}

export default DownloadButton;