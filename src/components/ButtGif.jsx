import LBHeader from '../assets/LB-header2.jpg'

const ButtGif = ({isMobile}) => {
    return (
        <div className={`card ${isMobile ? 'mobile-gif-card' : null}`}>
            <img src={LBHeader} className="header-image" alt="Header image" />
        </div>
    )
}

export default ButtGif