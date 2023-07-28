import Logo from './assets/lazybutts.png'
import TopNavBar from './components/TopNavBar.jsx'
import './App.css'

function App() {

  return (
    <>
      <TopNavBar />
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

export default App
