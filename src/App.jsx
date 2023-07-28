import Logo from './assets/lazybutts-horizontal.png'
import LogoMobile from './assets/lazybutts.png'
import TopNavBar from './components/TopNavBar.jsx'
import './App.css'

const Main = props => {
  return (
    <>
      <div>
        <img src={Logo} className="logo react" alt="React logo" />
      </div>
      <div className="card">
        <h1>Lazy GIF</h1>
      </div>
      <div className="card">
        Explanation of why we did Lazy Butts
      </div>
      <div className="card">
        Infographic of how traits work
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
  return (
    <>
      <TopNavBar />
      <Main />
      <Footer />
    </>
  )
}

export default App
