import { createBrowserRouter, Link, Route, RouterProvider, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Claim from './pages/Claim.jsx'
import MyButts from './pages/MyButts.jsx'
import TopNavBar from './components/TopNavBar.jsx'
import { WagmiConfig, wagmiConfig, ethereumClient, projectId } from './utils/w3m.js'
import { Web3Modal } from '@web3modal/react'
import { useIsMobile } from './utils/tools.js'
import { useEffect, useState } from 'react'
import './App.css'

const router = createBrowserRouter([
  { path: "*", Component: Root }
])

export default function App() {
  return <RouterProvider router={router} />
}

function Root() {
  const isMobile = useIsMobile()
  const [activePage, setActivePage] = useState('home')
  console.log(wagmiConfig)

  return (
    <div className="app">
      <WagmiConfig config={wagmiConfig} >
        <TopNavBar isMobile={isMobile} setActivePage={setActivePage} activePage={activePage} />
        <Routes>
          <Route path="/" element={<Home isMobile={isMobile} />} />
          <Route path="/claim" element={<Claim isMobile={isMobile} />} />
          <Route path="/butts" element={<MyButts isMobile={isMobile} />} />
        </Routes>
      </WagmiConfig>
      <Web3Modal
        projectId={projectId}
        ethereumClient={ethereumClient}
        themeMode="dark"
        themeVariables={{
          '--w3m-font-family': 'Permanent Marker, cursive',
          '--w3m-accent-color': '#d6b228',
          '--w3m-overlay-backdrop-filter': 'blur(10px)',
          '--w3m-logo-image-url': 'https://lazybutts.s3.amazonaws.com/public/images/www/3dkingslogo.png',
          '--w3m-background-image-url': 'https://lazybutts.s3.amazonaws.com/public/images/www/wallet-connect-banner.png'
        }} />
    </div>
  )
}
