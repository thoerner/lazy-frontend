import { useState, useEffect } from 'react';
import useModal from "../utils/useModal";
import { getMediumButtImage, getMetadata } from '../utils/api';
import DownloadBar from './DownloadBar';
import { getSessionToken } from '../utils/session';
import { useAccount } from 'wagmi';
import Traits from './Traits';

const ModalImage = ({ butt, buttMetadata, buttImage, isLoading, selectedType }) => {
    const { address } = useAccount()
    const sessionToken = getSessionToken()

    return (
        <div className="horizontalContainer">
            <Traits buttMetadata={buttMetadata} />
            {isLoading ? <div className="loading-container">
                <div className="loading"></div>
            </div> :
                <img
                    className={selectedType === 'full-body' ? 'buttModalImage fullBody' : 'buttModalImage'}
                    src={buttImage}
                    alt={`Lazy Butt #${butt.id}`}
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
    const [selectedType, setSelectedType] = useState('medium')
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
                <DownloadBar
                    butt={butt}
                    setButtImage={setButtImage}
                    setIsLoading={setIsLoading}
                    isLoading={isLoading}
                    selectedType={selectedType}
                    setSelectedType={setSelectedType}
                />
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
                        selectedType={selectedType}
                    />
                </div>
            </div>
        </>
    )
}

export default ButtModal;
