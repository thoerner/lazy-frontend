import reactLogo from './assets/lazybutts.png'
import './App.css'

function App() {

  return (
    <>
      <div>
        <a href="#">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
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
