import {
  ChevronLast,
  ChevronFirst,
  BarChart2,
} from "lucide-react";
import { createContext, useState } from "react";
import { LayoutDashboard, Settings, Receipt, Package } from "lucide-react";
export const SidebarContext = createContext({ expanded: true });
import { useLocation } from "react-router-dom";
import orcanetLogo from "./../assets/images/OrcaNet-Dark.png";
import SidebarItem from "./sidebaritem";

function MenuHeader({
  expanded,
  setExpanded,
}: {
  expanded: boolean;
  setExpanded: any;
}) {
  return (
    <div
      className={`p-4 pb-2 mt-1 mb-4 flex justify-${
        expanded ? "between" : "center"
      } items-center`}
    >
      <img
        src={orcanetLogo}
        className={`overflow-hidden transition-all ${
          expanded ? "w-32" : "w-0"
        }`}
        alt="OrcaNet Logo"
      />
      <button
        type="button"
        className="text-gray-400 hover:text-white transition duration-700 size-auto"
        onClick={() => setExpanded((curr: boolean) => !curr)}
      >
        {expanded ? <ChevronFirst /> : <ChevronLast size={27} />}
      </button>
    </div>
  );
}

function NavButtons({
  expanded,
  isActive,
}: {
  expanded: boolean;
  isActive: (path: string) => boolean;
}) {
  const navButtons = [
    {
      icon: <LayoutDashboard />,
      text: "Home",
      active: isActive("/"),
    },
    {
      icon: <Package />,
      text: "Stats",
      active: isActive("/stats"),
    },
    {
      icon: <BarChart2 />,
      text: "Market",
      active: isActive("/market"),
    },
    {
      icon: <Receipt />,
      text: "Wallet",
      active: isActive("/wallet"),
    },
    {
      icon: <Settings />,
      text: "Settings",
      active: isActive("/settings"),
    },
  ];

  return (
    <SidebarContext.Provider value={{ expanded }}>
      <div className="px-3">
        {navButtons.map(({ icon, text, active }) => (
          <SidebarItem key={text} icon={icon} text={text} active={active} />
        ))}
      </div>
    </SidebarContext.Provider>
  );
}

const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-stone-950 text-white">
        <MenuHeader expanded={expanded} setExpanded={setExpanded} />
        <NavButtons expanded={expanded} isActive={isActive} />
      </nav>
    </aside>
  );
};

export default Sidebar;
