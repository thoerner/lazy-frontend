import { Link } from 'react-router-dom'

const MintAnnouncement = () => {
    return (
        <div className="mint-announcement">
            <div className="mint-announcement-text">
                <h2>Public Claim Live!</h2>
                👇 Claim your Lazy Butt! 👇<br /><br />
                <Link to="/claim">
                    <button className="zoomy">Claim My Butts!</button>
                </Link>
            </div>
        </div>
    )
}

export default MintAnnouncement