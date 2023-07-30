import { createBrowserRouter, Link, Route, RouterProvider, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Claim from './pages/Claim.jsx'
import TopNavBar from './components/TopNavBar.jsx'
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

  return (
      <div className="app">
        <TopNavBar isMobile={isMobile} setActivePage={setActivePage} activePage={activePage} />
        <Routes>
          <Route path="/" element={<Home isMobile={isMobile} />} />
          <Route path="/claim" element={<Claim isMobile={isMobile} />} />
        </Routes>
      </div>
  )
}
