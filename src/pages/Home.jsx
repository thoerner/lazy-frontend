import PropType from 'prop-types'
import Main from '../components/Main.jsx'
import Footer from '../components/Footer.jsx'
import { useEffect } from 'react'

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

Home.propTypes = {
    isMobile: PropType.bool.isRequired,
}

export default Home