import { useEffect } from 'react';
import useModal from "../utils/useModal";
import { getButtImageUrl } from '../utils/tools.js';
import DownloadButton from './DownloadButton';

// modal for displaying butt details and download button
const ButtModal = ({ butt, buttImage }) => {
    const { closeModal } = useModal()

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
                    <h3>Lazy Butt #{butt.id}</h3>
                    <div className="horizontalContainer">
                        <p className="traits">
                            <span className="buttModalBold">Butt Background:</span> <br />
                            <span className="buttModalBold">Butt:</span> <br />
                            <span className="buttModalBold">Bodygear Bottom:</span> <br />
                            <span className="buttModalBold">Accessories:</span> <br />
                            <span className="buttModalBold">Tail Tuft:</span> <br />
                        </p>
                        <img src={buttImage} alt="Lazy Butts" />
                    </div>
                    <DownloadButton butt={butt} />
                </div>
            </div>
        </>
    )
}

export default ButtModal;
