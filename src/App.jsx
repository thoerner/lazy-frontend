import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home.jsx";
import Claim from "./pages/Claim.jsx";
import MyButts from "./pages/MyButts.jsx";
import Butt from "./pages/Butt.jsx";
import AdminPage from "./pages/Admin.jsx";
import TopNavBar from "./components/TopNavBar.jsx";
import WelcomePopup from "./components/WelcomePopup.jsx";
import { WagmiConfig, wagmiConfig, projectId, chains } from "./utils/w3m.js";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { useIsMobile } from "./utils/tools.js";
import { useState } from "react";
import "./App.css";

const router = createBrowserRouter([{ path: "*", Component: Root }]);

export default function App() {
  return <RouterProvider router={router} />;
}

createWeb3Modal({
  wagmiConfig,
  projectId,
  chains,
  themeVariables: {
    "--w3m-font-family": "Permanent Marker, cursive",
    "--w3m-accent": "#d6b228",
  },
});

function Root() {
  const isMobile = useIsMobile();
  const [activePage, setActivePage] = useState("home");
  const [authenticated, setAuthenticated] = useState(false);
  const [myLions, setMyLions] = useState([]);

  return (
    <div className="app">
      <WagmiConfig config={wagmiConfig}>
        <Toaster />
        <WelcomePopup />
        <TopNavBar
          isMobile={isMobile}
          setActivePage={setActivePage}
          activePage={activePage}
        />
        <Routes>
          <Route path="/" element={<Home isMobile={isMobile} />} />
          <Route
            path="/claim"
            element={
              <Claim
                isMobile={isMobile}
                setActivePage={setActivePage}
                myLions={myLions}
                setMyLions={setMyLions}
              />
            }
          />
          <Route
            path="/butts"
            element={
              <MyButts
                isMobile={isMobile}
                setActivePage={setActivePage}
                authenticated={authenticated}
                setAuthenticated={setAuthenticated}
                myLions={myLions}
                setMyLions={setMyLions}
              />
            }
          />
          <Route
            path="/butt/:id"
            element={<Butt isMobile={isMobile} setActivePage={setActivePage} />}
          />
          <Route
            path="/admin"
            element={
              <AdminPage isMobile={isMobile} setActivePage={setActivePage} />
            }
          />
        </Routes>
      </WagmiConfig>
    </div>
  );
}
