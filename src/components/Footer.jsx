function getCurrentYear() {
    return new Date().getFullYear()
}

const Footer = props => {
    return (
        <div className="footer">
            &copy; {getCurrentYear()} 3D Kings NFT Trait Group. All rights reserved.
        </div>
    )
}

export default Footer