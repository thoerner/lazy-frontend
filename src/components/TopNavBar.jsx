import HamburgerMenu from "./HamburgerMenu.jsx"

const MobileView = ({ links }) => {
    return (
        <div className='topnav-mobile'>
            <a className="active" href="#home">Home</a>
            <HamburgerMenu links={links} />
        </div>
    )
}

const DesktopView = ({ links }) => {
    return (
        <div className="topnav">
            {links}
        </div>
    )
}

const TopNavBar = ({ isMobile }) => {
    const links =
        <>
            <a href="https://x.com/3DKingsNFT" target="_blank" rel="noreferrer">X (@3DKingsNFT)</a>
            <a href="#mylions">My Lions</a>
            <a href="https://opensea.io/collection/lazy-lions" target="_blank" rel="noreferrer">LL OpenSea</a>
            <a className="active" href="#home">Home</a>
            <a href="#mylazybutts">My Lazy Butts</a>
            <a href="#buttsopensea">LB OpenSea</a>
        </>
    return (
        <>
            {isMobile ? <MobileView links={links} /> : <DesktopView links={links} />}
        </>
    )
}

export default TopNavBar