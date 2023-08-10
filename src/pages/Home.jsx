import Main from '../components/Main.jsx'
import Footer from '../components/Footer.jsx'
import { useEffect, useState } from 'react'

const Home = ({ isMobile }) => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="home">
            <Main isMobile={isMobile} />
            <Footer />
        </div>
    )
}

export default Home