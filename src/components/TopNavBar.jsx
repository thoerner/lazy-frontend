import { useState } from 'react'

const HamburgerMenu = props => {
    const [isActive, setIsActive] = useState(false)

    const toggleClass = () => {
        setIsActive(!isActive)
    }

    return (
        <>  
            <div className={`hamburger-menu ${isActive ? 'change' : ''}`} onClick={toggleClass}>
                <div className="bar1"></div>
                <div className="bar2"></div>
                <div className="bar3"></div>
            </div>
            {isActive ?
                    <div className="overlay">
                        <a href="https://x.com/3DKingsNFT" target="_blank" rel="noreferrer"><span style={{fontFamily: 'X'}}>X</span></a>
                        <a href="#mylions">My Lions</a>
                        <a href="https://opensea.io/collection/lazy-lions" target="_blank" rel="noreferrer">LL OpenSea</a>
                        <a className="active" href="#home">Home</a>
                        <a href="#mylazybutts">My Lazy Butts</a>
                        <a href="#buttsopensea">LB OpenSea</a>
                    </div>
                    : null
            }
        </>
    )
}

const MobileView = props => {
    return (
        <>
            <div className='topnav-mobile'>
                <a className="active" href="#home">Home</a>
                <HamburgerMenu/>
            </div>
        </>
    )
}

const DesktopView = props => {
    return (
        <div className="topnav">
            <a href="https://x.com/3DKingsNFT" target="_blank" rel="noreferrer"><span style={{/*fontFamily: 'SpecialAlphabets', fontSize: '1.2rem'*/}}>X</span></a>
            <a href="#mylions">My Lions</a>
            <a href="https://opensea.io/collection/lazy-lions" target="_blank" rel="noreferrer">LL OpenSea</a>
            <a className="active" href="#home">Home</a>
            <a href="#mylazybutts">My Lazy Butts</a>
            <a href="#buttsopensea">LB OpenSea</a>
        </div>
    )
}

const TopNavBar = ({isMobile}) => {
    return (
        <>
            {isMobile ? <MobileView /> : <DesktopView />}
        </>
    )
}

export default TopNavBar