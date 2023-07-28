import Logo from '../assets/lazybutts-horizontal.png'
import LogoMobile from '../assets/lazybutts.png'

const ButtLogo = ({ isMobile }) => {
    return (
        <>
            {isMobile ?
                <img src={LogoMobile} className="logo" alt="Lazy Butts Logo" /> :
                <img src={Logo} className="logo" alt="Lazy Butts Logo" />
            }
        </>
    )
}

export default ButtLogo