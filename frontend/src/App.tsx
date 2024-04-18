import HomePage from "./home/HomePage";
import StatsPage from "./stats/StatsPage";
import MarketPage from "./market/MarketPage";
import WalletPage from "./wallet/WalletPage";
import SettingsPage from "./settings/SettingsPage";
import Sidebar from "./sidebar/sidebar";

import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

import "./App.css";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div id="App" className="overflow-hidden size-full">
        <Router>
          <Sidebar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/stats" element={<StatsPage />} />
            <Route path="/market" element={<MarketPage />} />
            <Route path="/wallet" element={<WalletPage path="wallet"/>} />
            <Route path="/wallet/transactions" element={<WalletPage path="transactions"/>} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;