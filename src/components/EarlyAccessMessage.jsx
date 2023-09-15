import toast from 'react-hot-toast'
import { useIsMobile } from '../utils/tools'

const EarlyAccessMessage = ({ address, isAllowListed }) => {
    const isMobile = useIsMobile()

    const handleClick = () => {
        if (!address) {
            toast.error('Please connect your wallet')
            return
        }
        if (isAllowListed) {
            toast.success('You are on the Early Access list!')
        } else {
            toast.error('You are not on the Early Access list.')
        }
    }

    return (
        <>
            <div className="threeDeeDiv">
                {isMobile ?
                    <>
                        <h2 style={{ color: '#00caf8bb', margin: '0' }}>Early&nbsp;Access</h2>
                        <h2 style={{ color: '#ff2b06bb', margin: '0', transform: 'translateY(-90%) translateX(1%)' }}>Early Access</h2>
                        <p style={{ marginTop: '0', zIndex: 10, fontSize: '0.8rem' }}>3D Glasses NFT holders, including both Lazy Lions and Lazy Cubs, will receive early access! You can claim as many Lazy Butts as you wish, 24 hours before the official launch. Plus, your first NFT claimed comes with a 50% discount!</p>
                        <p style={{ marginTop: '0', zIndex: 10, fontSize: '0.8rem' }}>Snapshot taken: 9/14/2023 @ 5:00pm EDT</p>
                    </> : <>
                        <h1 style={{ color: '#00caf8bb', margin: '0' }}>Early&nbsp;Access</h1>
                        <h1 style={{ color: '#ff2b06bb', margin: '0', transform: 'translateY(-90%) translateX(1%)' }}>Early Access</h1>
                        <p style={{ marginTop: '0', zIndex: 10 }}>3D Glasses NFT holders, including both Lazy Lions and Lazy Cubs, will receive early access! You can claim as many Lazy Butts as you wish, 24 hours before the official launch. Plus, your first NFT claimed comes with a 50% discount!</p>
                        <p style={{ marginTop: '0', zIndex: 10 }}>Snapshot taken: 9/14/2023 @ 5:00pm EDT</p>
                    </>}

            </div>
            <button onClick={handleClick}>Check Early Access List</button>
        </>
    )
}

export default EarlyAccessMessage