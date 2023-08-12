import { useState } from 'react'
import { getFullResButt, getFullBody, getTwitterFriendlyFullBody } from '../utils/api.js'

// button for downloading butt images
const DownloadButton = ({ butt }) => {
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
            >Download</div>
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
                    onClick={getFullResButt(butt.id)}
                >
                        Full Resolution Butt
                </div>
                <div className="downloadButtonDropdownItem"
                    onClick={getFullBody(butt.id)}
                >
                        Full Body
                </div>
                <div className="downloadButtonDropdownItem"
                    onClick={getTwitterFriendlyFullBody(butt.id)}
                >
                        Twitter Friendly
                </div>
            </div>
        </div>
    )
}

export default DownloadButton;