import { useState } from 'react'
import { getFullResButtImage, getFullBodyImage, getMediumButtImage } from '../utils/api.js'
import { getSessionToken } from '../utils/session.js'
import { useAccount } from 'wagmi'
import toast from 'react-hot-toast'

// button for downloading butt images
const DownloadButton = ({ butt }) => {
    const { address } = useAccount()
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const sessionToken = getSessionToken()

    const handleDropdownClick = () => {
        setDropdownOpen(!dropdownOpen)
    }

    const handleDownloadClick = () => {
        handleDownloadMediumButtImage(butt.id)
        setDropdownOpen(false)
    }

    function createTempAnchor(url, filename) {
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    const handleDownloadMediumButtImage = async (buttId) => {
        // initiate a toast to let the user know the download is starting, it should resolve when the download is complete
        const downloadToast = toast.promise(
            getMediumButtImage(buttId),
            {
                loading: 'Downloading...',
                success: 'Download complete!',
                error: 'Download failed'
            }
        ).then((imageBlob) => {
            const url = window.URL.createObjectURL(imageBlob);
            createTempAnchor(url, `lazy-butt-${buttId}.png`);
            window.URL.revokeObjectURL(url);  // Free up memory
        })
    }

    const handleDownloadFullResButtImage = async (buttId, address, sessionToken) => {
        // initiate a toast to let the user know the download is starting, it should resolve when the download is complete
        const downloadToast = toast.promise(
            getFullResButtImage(buttId, address, sessionToken),
            {
                loading: 'Downloading...',
                success: 'Download complete!',
                error: 'Download failed'
            }
        ).then((imageBlob) => {
            const url = window.URL.createObjectURL(imageBlob);
            createTempAnchor(url, `lazy-butt-full-res-${buttId}.png`);
            window.URL.revokeObjectURL(url);  // Free up memory
        })
    }

    const handleDownloadFullBodyImage = async (buttId, address, sessionToken) => {
        // initiate a toast to let the user know the download is starting, it should resolve when the download is complete
        const downloadToast = toast.promise(
            getFullBodyImage(buttId, address, sessionToken),
            {
                loading: 'Downloading...',
                success: 'Download complete!',
                error: 'Download failed'
            }
        ).then((imageBlob) => {
            const url = window.URL.createObjectURL(imageBlob);
            createTempAnchor(url, `lazy-butt-full-body-${buttId}.png`);
            window.URL.revokeObjectURL(url);  // Free up memory
        })
    }

    // download button with dropdown menu
    return (
        <div className="downloadButton">
            <div className="downloadButtonInnerFirst"
                onClick={handleDownloadClick}
            >DOWNLOAD&nbsp;<span style={{ fontSize: '0.8rem', lineHeight: '1rem' }}>(4k × 4k)</span></div>
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
                <div className="downloadButtonDropdownItem"
                    onClick={() => handleDownloadFullResButtImage(butt.id, address, sessionToken)}
                >
                    Download Full Res<br /><span style={{ fontSize: '0.8rem', lineHeight: '1rem', marginTop: '0.2rem' }}>(8k × 8k)</span>
                </div>
                <div className="downloadButtonDropdownItem"
                    onClick={() => handleDownloadFullBodyImage(butt.id, address, sessionToken)}
                >
                    Full Body
                </div>
                {/* <div className="downloadButtonDropdownItem"
                    onClick={() => getTwitterFriendlyFullBody(butt.id)}
                >
                        Twitter Friendly
                </div> */}
            </div>
        </div>
    )
}

export default DownloadButton;