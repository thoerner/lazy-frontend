import { useState, useEffect } from 'react';
import useModal from "../utils/useModal";
import { getMediumButtImage, getMetadata } from '../utils/api';
import DownloadButton from './DownloadButton';
import { getSessionToken } from '../utils/session';
import { useAccount } from 'wagmi';
import Traits from './Traits';

const ModalImage = ({ butt, buttMetadata, buttImage, isLoading }) => {
    const handleImageClick = () => {
        if (buttMetadata) {
            window.open(`https://api.the3dkings.io/api/images/medium/${butt.id}.png`, '_blank')
        }
    }
    return (
        <div className="horizontalContainer">
            <Traits buttMetadata={buttMetadata} />
            {isLoading ? <div className="loading-container">
                <div className="loading"></div>
            </div> :
                <img className="buttModalImage" src={buttImage} alt={`Lazy Butt #${butt.id}`}
                    onClick={handleImageClick}
                />
            }
        </div>
    )
}

// modal for displaying butt details and download button
const ButtModal = ({ butt }) => {
    const { closeModal } = useModal()
    const { address } = useAccount()
    const [isLoading, setIsLoading] = useState(true)
    const [buttImage, setButtImage] = useState(null)
    const [buttMetadata, setButtMetadata] = useState(null)
    const sessionToken = getSessionToken()

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                closeModal()
            }
        }
        window.addEventListener('keydown', handleEscape)
        return () => {
            window.removeEventListener('keydown', handleEscape)
        }
    }, [])

    useEffect(() => {
        const fetchButtImage = async () => {
            const imageBlob = await getMediumButtImage(butt.id)
            const buttImage = URL.createObjectURL(imageBlob)
            setButtImage(buttImage)
            setIsLoading(false)
        }
        const fetchMetadata = async () => {
            const metadata = await getMetadata(butt.id)
            setButtMetadata(metadata)
        }
        fetchMetadata()
        fetchButtImage()
    }, [butt])

    const handleModalClose = () => {
        closeModal()
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
                    <div className="buttModalTitle">Lazy Butt #{butt.id}</div>
                    <ModalImage
                        butt={butt}
                        buttMetadata={buttMetadata}
                        buttImage={buttImage}
                        isLoading={isLoading}
                    />
                    <DownloadButton butt={butt} />
                </div>
            </div>
        </>
    )
}

export default ButtModal;
