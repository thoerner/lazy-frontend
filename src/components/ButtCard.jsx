import React, { useState } from 'react';
import { getButtImageUrl } from '../utils/tools.js'; 
import ModalContext from "../contexts/ModalContext";
import ButtModal from './ButtModal.jsx';

// card for displaying butt image and butt number
const ButtCard = ({ butt, buttImage }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const handleButtClick = () => {
        openModal()
    }

    return (
        <ModalContext.Provider value={{ isModalOpen, openModal, closeModal }}>
            {isModalOpen && <ButtModal butt={butt} buttImage={buttImage} />}
            <div className="buttCard">
                <i
                    className="fas fa-butt"
                    style={{ fontSize: "100px", color: "white" }}
                ></i>
                <h3>Butt #{butt.id}</h3>
                <img src={buttImage} alt="Lazy Butts"
                    onClick={handleButtClick}
                />
            </div>
        </ModalContext.Provider>
    )
}

export default ButtCard;