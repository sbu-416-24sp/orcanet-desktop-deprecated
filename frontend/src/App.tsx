import "./index.css";
import "./stylesheets/App.scss";
import "bootstrap/dist/css/bootstrap.css";

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Menu from "./components/Menu";
import DashboardPage from "./components/Dashboard/DashboardPage";
import FileUploadPage from "./components/FileUpload/FileUploadPage";
import PeerPage from "./components/PeerPage/PeerPage";
import SettingPage from "./components/Setting/SettingPage";
import MarketPage from "./components/Market/MarketPage";
import HelpPage from "./components/HelpPage/HelpPage";

function LocationProvider({ children }: { children: React.ReactNode }) {
  console.log(children);
  return <AnimatePresence>{children}</AnimatePresence>;
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<FileUploadPage />} />
      <Route path="/peer" element={<PeerPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/setting" element={<SettingPage />} />
      <Route path="/market" element={<MarketPage />} />
      <Route path="/help" element={<HelpPage />} />
      {/* <Route path="/wallet" element={<MarketPage />} /> */}
    </Routes>
  );
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Menu />
        <LocationProvider>
          <AnimatedRoutes />
        </LocationProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
