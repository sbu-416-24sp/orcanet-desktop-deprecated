import HomePage from "./home/HomePage";
import StatsPage from "./stats/StatsPage";
import PeerPage from "./peer/PeerPage";
import MarketPage from "./market/MarketPage";
import WalletPage from "./wallet/WalletPage";
import SettingsPage from "./settings/SettingsPage";
import Sidebar from "./sidebar/Sidebar";
import MiningPage from "./mining/Mining";

import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div id="App" className="size-full">
        <Router>
          <Sidebar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/stats" element={<StatsPage />} />
            <Route path="/peer" element={<PeerPage />} />
            <Route path="/market" element={<MarketPage />} />
            <Route path="/wallet" element={<WalletPage />} />
            <Route path="/mining" element={<MiningPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
