import { useState } from "react";
import PropType from "prop-types";

const HamburgerMenu = ({ links }) => {
  const [isActive, setIsActive] = useState(false);

  const toggleClass = () => {
    setIsActive(!isActive);
  };

  const onOverlayClick = () => {
    setIsActive(false);
  };

  return (
    <>
      <div
        className={`hamburger-menu ${isActive ? "change" : ""}`}
        onClick={toggleClass}
      >
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
      </div>
      {isActive ? (
        <div className="overlay" onClick={onOverlayClick}>
          {links}
        </div>
      ) : null}
    </>
  );
};

HamburgerMenu.propTypes = {
  links: PropType.element.isRequired,
};

export default HamburgerMenu;
