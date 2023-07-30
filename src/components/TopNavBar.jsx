import { Link } from 'react-router-dom'

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

const TopNavBar = ({ isMobile, activePage, setActivePage }) => {
    const pageDict = {
        'home': '/',
        'claim': '/claim',
    }

    const onLinkClick = (e) => {
        const link = e.target
        const id = link.id
        if (id) {
            setActivePage(id)
        }
    }

    const MenuLink = ({ link, text }) => {
        return (
            <Link className={activePage === link ? 'active' : null} to={pageDict[link]} id={link} onClick={onLinkClick}>{text}</Link>
        )
    }

    const links =
        <>
            <MenuLink link='home' text='Home' />
            <MenuLink link='claim' text='Claim my Butts' />
            <a href="#mylazybutts">My Lazy Butts</a>
            <a href="https://x.com/3DKingsNFT" target="_blank" rel="noreferrer">X (@3DKingsNFT)</a>
            <a href="https://opensea.io/collection/lazy-lions" target="_blank" rel="noreferrer">LL OpenSea</a>
            <a href="#buttsopensea">LB OpenSea</a>
        </>
    return (
        <>
            {isMobile ? <MobileView links={links} /> : <DesktopView links={links} />}
        </>
    )
}

export default TopNavBar