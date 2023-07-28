import ButtLogo from './components/ButtLogo.jsx'
import HowToBuildAButt from './assets/how-to-build-a-butt.jpeg'
import TeamInfo from './components/TeamInfo.jsx'
import TopNavBar from './components/TopNavBar.jsx'
import { useIsMobile } from './utils/tools.js'
import './App.css'

const Main = ({ isMobile }) => {
  return (
    <>
      <div>
        <ButtLogo
          isMobile={isMobile}
        />
      </div>
      <div className="card">
        <h1>Lazy GIF</h1>
      </div>
      <div className="card">
        Explanation of why we created Lazy Butts
      </div>
      <div className="card">
        <img src={HowToBuildAButt} className="how-to-build-a-butt" alt="How to build a butt" />
      </div>
      <div className="card">
        <button>Claim my Butts</button>
      </div>
      <div className="card">
        Infographic of mint funds allocation
      </div>
      <div className="card">
        <TeamInfo />
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
