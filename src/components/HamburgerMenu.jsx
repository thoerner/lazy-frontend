import { useState } from 'react'

const HamburgerMenu = ({ links }) => {
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
                    {links}
                </div>
                : null
            }
        </>
    )
}

export default HamburgerMenu