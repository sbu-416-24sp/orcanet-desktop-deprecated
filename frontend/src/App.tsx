import HomePage from "./home/HomePage";
import StorePage from "./store/StorePage";
import MarketPage from "./market/MarketPage";
import WalletPage from "./wallet/WalletPage";
import PeersPage from "./peers/PeersPage";
import SettingsPage from "./settings/SettingsPage";
import Sidebar from "./sidebar/sidebar";

import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div id="App">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/store" element={<StorePage />} />
            <Route path="/market" element={<MarketPage />} />
            <Route path="/wallet" element={<WalletPage />} />
            <Route path="/peers" element={<PeersPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;

const pageMap: { label: string; path: string }[] = [
  { label: "Home", path: "/" },
  { label: "Store", path: "/store" },
  { label: "Market", path: "/market" },
  { label: "Wallet", path: "/wallet" },
  { label: "Peers", path: "/peers" },
  { label: "Settings", path: "/settings" },
];

const Navbar = () => {
  return (
    <Sidebar /> 
  );
};

import { Button } from "@/components/ui/button";

const NavLink = (props: { label: string; path: string }) => {
  return (
    <Link to={props.path}>
      <Button>{props.label}</Button>
    </Link>
  );
};
