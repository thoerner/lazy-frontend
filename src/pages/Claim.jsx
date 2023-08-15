import { useState, useEffect } from 'react'
import { useAccount } from '../utils/w3m.js'
import { getLions, getButts } from '../utils/api.js'
import Footer from '../components/Footer'
import MyLionsSection from '../components/MyLionsSection'
import ClaimHeader from '../components/ClaimHeader'
import ClaimInfo from '../components/ClaimInfo'
import ClaimAreaRight from '../components/ClaimAreaRight'
import ClaimAreaMiddle from '../components/ClaimAreaMiddle'

const Claim = ({ isMobile, setActivePage }) => {
    const { address, isConnected } = useAccount()
    const [myLions, setMyLions] = useState([])
    const [myButts, setMyButts] = useState([])
    const [selectedLions, setSelectedLions] = useState([])
    const [price, setPrice] = useState(0.02)
    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        setActivePage('claim')
    }, [setActivePage])

    useEffect(() => {
        const fetchButts = async (address) => {
            const butts = []
            const data = await getButts(address)
            for (let i = 0; i < data.length; i++) {
                butts.push({ id: data[i] })
            }
            if (data) {
                setMyButts(butts)
            }
        }
        const fetchLions = async (address) => {
            const lions = []
            const data = await getLions(address)
            for (let i = 0; i < data.length; i++) {
                lions.push({ id: data[i] })
            }
            if (data) {
                setMyLions(lions)
            }
        }
        if (isConnected) {
            fetchButts(address)
            fetchLions(address)
        }
    }, [address, isConnected])

    useEffect(() => {
        let total = 0
        total = Math.round(((price * selectedLions.length) + Number.EPSILON) * 100) / 100
        setTotalPrice(total)
    }, [selectedLions, setTotalPrice])

    const handleLionClick = (lion) => {
        const lionIndex = selectedLions.findIndex(l => l.id === lion.id)
        if (lionIndex === -1) {
            if (selectedLions.length === 5) {
                return
            }
            setSelectedLions([...selectedLions, lion])
        } else {
            const newSelectedLions = selectedLions.filter(l => l.id !== lion.id)
            setSelectedLions(newSelectedLions)
        }
    }

    return (
        <div className="claim">
            <div className="main">
                <ClaimHeader />
                <ClaimInfo 
                    address={address}
                />
                <div className="claim-area">
                    <div className="claim-area-title">
                        <h2>Pick Your Butt</h2>
                    </div>
                    <div className="claim-area-main">
                        <MyLionsSection isConnected={isConnected} myLions={myLions} handleLionClick={handleLionClick} selectedLions={selectedLions} address={address} myButts={myButts} />
                        <ClaimAreaMiddle selectedLions={selectedLions} />
                        <ClaimAreaRight selectedLions={selectedLions} myLions={myLions} totalPrice={totalPrice} price={price} isConnected={isConnected} />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Claim