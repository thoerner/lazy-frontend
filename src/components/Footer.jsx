function getCurrentYear() {
    return new Date().getFullYear()
}

const Footer = props => {
    return (
        <div className="footer">
            <p>&copy; {getCurrentYear()} 3D Kings NFT Trait Group. All rights reserved.</p>
        </div>
    )
}

export default Footer