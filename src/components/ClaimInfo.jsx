import { useState, useEffect } from 'react'
import Disclaimer from './Disclaimer'
import { getProof } from '../utils/api'
import toast from 'react-hot-toast'

const EarlyAccessMessage = ({ address }) => {
    const [proof, setProof] = useState(null)

    useEffect(() => {
        const fetchProof = async () => {
            const proof = await getProof(address)
            setProof(proof)
        }
        fetchProof()
    }, [address])

    const handleClick = () => {
        if (!proof) return
        if (proof.success) {
            toast.success('You are on the access list!')
        } else if (proof.message) {
            toast.error(proof.message)
        } else {
            toast.error('Error fetching proof')
        }
    }

    return (
        <>
            <div className="threeDeeDiv">
                <p>3D Glasses NFT holders, including both Lazy Lions and Lazy Cubs, will receive early access! You can claim as many Lazy Butts as you wish, 24 hours before the official launch. Plus, your first claim comes with a 50% discount!</p>
            </div>
            <button onClick={handleClick}>Check Access List</button>
        </>
    )
}

const ClaimInfo = ({ address }) => {
    return (
        <div className="claim-info">
            <p>Claiming your Lazy Butts NFTs is a straightforward process. Begin by selecting the Lazy Lion NFTs for which you'd like to claim Butts. After selection, click the "Claim Butts" button. Following this, you'll be asked to sign a transaction in order to claim your Butts.</p>
            <p>Upon transaction confirmation, your newly claimed Butts will appear in your wallet. Please make sure to revisit our website after claiming. Here, you can download your high-resolution Lazy Butts NFTs along with your full-body Lion NFTs and other exclusive items. However, note that full-body Lion downloads are only available if you own both the corresponding Lazy Lions and Lazy Butts NFTs.</p>
            <Disclaimer />
            <EarlyAccessMessage
                address={address}
            />
        </div>
    )
}

export default ClaimInfo