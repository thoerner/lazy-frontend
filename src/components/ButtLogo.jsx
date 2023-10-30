import PropType from "prop-types";
import Logo from "../assets/lazybutts-horizontal.png";
import LogoMobile from "../assets/lazybutts.png";

const ButtLogo = ({ isMobile }) => {
  return (
    <div>
      {isMobile ? (
        <img src={LogoMobile} className="logo" alt="Lazy Butts Logo" />
      ) : (
        <img src={Logo} className="logo" alt="Lazy Butts Logo" />
      )}
    </div>
  );
};

ButtLogo.propTypes = {
  isMobile: PropType.bool.isRequired,
};

export default ButtLogo;
