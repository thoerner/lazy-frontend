import Main from '../components/Main.jsx'
import Footer from '../components/Footer.jsx'

const Home = ({ isMobile }) => {
    return (
        <div className="home">
            <Main isMobile={isMobile} />
            <Footer />
        </div>
    )
}

export default Home