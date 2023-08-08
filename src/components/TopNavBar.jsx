import { Link } from 'react-router-dom'
import { useAccount } from 'wagmi'
import HamburgerMenu from "./HamburgerMenu.jsx"
import WalletConnectButton from './WalletConnectButton.jsx'
import ThreeDKingsLogo from '../assets/3dkingslogo.png'

const Logo = ({type}) => {
    return (
        <a href="https://the3dkings.io/" id="three-d-kings-target" target="_blank" rel="noreferrer">
            <img id={type === 'mobile' ? "three-d-kings-logo-mobile" : "three-d-kings-logo"} src={ThreeDKingsLogo} alt="3D Kings Logo" />
            <img id={type === 'mobile' ? "three-d-kings-logo-overlay-mobile" : "three-d-kings-logo-overlay"} src={ThreeDKingsLogo} alt="3D Kings Logo" />
        </a>
    )
}

const MobileView = ({ links, address, isConnected }) => {
    return (
        <div className='topnav-mobile'>
            <Logo type="mobile"/>
            <WalletConnectButton address={address} isConnected={isConnected} />
            <HamburgerMenu links={links} />
        </div>
    )
}

const DesktopView = ({ links, address, isConnected }) => {
    return (
        <div className="topnav">
            <Logo />
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

    const toggleDropdown = () => {
        const dropdown = document.getElementsByClassName('dropdown-content')[0]
        dropdown.classList.toggle('show')
        const dropdownButton = document.getElementsByClassName('dropbtn')[0]
        dropdownButton.classList.toggle('active')
    }


    const links =
        <>
            <MenuLink link='home' text='Home' />
            <MenuLink link='claim' text='Claim my Butts' />
            <MenuLink link='mybutts' text='My Assets' />
            <span className="dropdown">
                <span className="dropbtn" onClick={toggleDropdown}>OpenSea</span>
                <span className="dropdown-content">
                    <a href="https://opensea.io/collection/lazy-lions" target="_blank" rel="noreferrer">Lazy Lions</a>
                    <a href="https://opensea.io/collection/lazy-butts" target="_blank" rel="noreferrer">Lazy Butts</a>
                    <div className="dropdown-overlay" onClick={toggleDropdown}></div>
                </span>
            </span>
            {/* <a href="https://3dkings.group" target="_blank" rel="noreferrer">3D Kings</a> */}
            <a href="https://x.com/3DKingsNFT" target="_blank" rel="noreferrer">X (@3DKingsNFT)</a>

        </>

    const mobileLinks =
        <>
            {/* <Logo type="mobile"/> */}
            <MenuLink link='home' text='Home' />
            <MenuLink link='claim' text='Claim my Butts' />
            <MenuLink link='mybutts' text='My Assets' />
            <a href="https://x.com/3DKingsNFT" target="_blank" rel="noreferrer">X (@3DKingsNFT)</a>
            <a href="https://opensea.io/collection/lazy-lions" target="_blank" rel="noreferrer">LL OpenSea</a>
            <a href="https://opensea.io/collection/lazy-butts" target="_blank" rel="noreferrer">LB OpenSea</a>
        </>
    return (
        <>
            {isMobile ? <MobileView links={mobileLinks} address={address} isConnected={isConnected} /> : <DesktopView links={links} address={address} isConnected={isConnected} />}
        </>
    )
}

export default TopNavBar