import Logo from './assets/lazybutts-horizontal.png'
import LogoMobile from './assets/lazybutts.png'
import HowToBuildAButt from './assets/how-to-build-a-butt.jpeg'
import TopNavBar from './components/TopNavBar.jsx'
import { useIsMobile } from './utils/tools.js'
import './App.css'

const Main = ({isMobile}) => {
  return (
    <>
      <div>
        {isMobile ? 
          <img src={LogoMobile} className="logo" alt="Lazy Butts Logo" /> : 
          <img src={Logo} className="logo" alt="Lazy Butts Logo" />
        }
      </div>
      <div className="card">
        <h1>Lazy GIF</h1>
      </div>
      <div className="card">
        Explanation of why we did Lazy Butts
      </div>
      <div className="card">
        <img src={HowToBuildAButt} className="how-to-build-a-butt" alt="How to build a butt" />
      </div>
      <div className="card">
        <button>Claim my Butts</button>
      </div>
      <div className="card">
        Infographic of mint funds
      </div>
      <div className="card">
        Team info
      </div>
    </>
  )
}

const Footer = props => {
  return (
    <div className="footer">
      Lazy Butts is not affiliated with Lazy Lions. Read the docs <a href="https://lazybuttsnft.gitbook.io/lazy-butts/" target="_blank" rel="noreferrer">here</a>.
    </div>
  )
}

function App() {
  const isMobile = useIsMobile()

  return (
    <div className="app">
      <TopNavBar 
        isMobile={isMobile}
      />
      <Main
        isMobile={isMobile} 
      />
      <Footer />
    </div>
  )
}

export default App
