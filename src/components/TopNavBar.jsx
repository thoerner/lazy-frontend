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
                        <a href="https://twitter.com/lazybuttsnft" target="_blank" rel="noreferrer">Twitter</a>
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
            <a href="https://twitter.com/lazybuttsnft" target="_blank" rel="noreferrer">Twitter</a>
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