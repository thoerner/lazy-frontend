import TopNavBar from './components/TopNavBar.jsx'
import Main from './components/Main.jsx'
import Footer from './components/Footer.jsx'
import { useIsMobile } from './utils/tools.js'
import './App.css'

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
