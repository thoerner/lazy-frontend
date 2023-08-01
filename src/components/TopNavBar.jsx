import { Link } from 'react-router-dom'
import { useAccount } from 'wagmi'
import HamburgerMenu from "./HamburgerMenu.jsx"
import WalletConnectButton from './WalletConnectButton.jsx'

const MobileView = ({ links, address, isConnected }) => {
    return (
        <div className='topnav-mobile'>
            <WalletConnectButton address={address} isConnected={isConnected}/>
            <HamburgerMenu links={links} />
        </div>
    )
}

const DesktopView = ({ links, address, isConnected }) => {
    return (
        <div className="topnav">
            <WalletConnectButton address={address} isConnected={isConnected} />
            {links}
        </div>
    )
}

const TopNavBar = ({ isMobile, activePage, setActivePage }) => {
    const { address, isConnected } = useAccount()
    const pageDict = {
        'home': '/',
        'claim': '/claim',
        'mybutts': '/butts'
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
            <MenuLink link='mybutts' text='My Lazy Butts' />
            <a href="https://x.com/3DKingsNFT" target="_blank" rel="noreferrer">X (@3DKingsNFT)</a>
            <a href="https://opensea.io/collection/lazy-lions" target="_blank" rel="noreferrer">LL OpenSea</a>
            <a href="https://opensea.io/collection/lazy-butts" target="_blank" rel="noreferrer">LB OpenSea</a>
        </>
    return (
        <>
            {isMobile ? <MobileView links={links} address={address} isConnected={isConnected} /> : <DesktopView links={links} address={address} isConnected={isConnected} />}
        </>
    )
}

export default TopNavBar