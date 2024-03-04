import Logo from "../svgs/OrcaNetLogo.tsx";

import { NavLink } from "react-router-dom";
import { useState } from "react";
import {
  PersonGear,
  CloudArrowUp,
  DatabaseAdd,
  Gear,
  PersonFillGear,
  CloudArrowUpFill,
  DatabaseFillAdd,
  GearFill,
  Wallet,
  WalletFill,
  Cart,
  CartFill,
} from "react-bootstrap-icons";

const iconColor = "white";
const iconSize = 38;

interface TabProps {
  path: string;
  active: boolean;
  onClick: () => void;
  Icon: React.ElementType;
  text: string;
}

function Tab({ path, active, onClick, Icon, text }: TabProps) {
  return (
    <NavLink className={"no-underline"} to={path}>
      <div className="flex items-center" onClick={onClick}>
        <div>
          {active ? (
            <Icon color={iconColor} size={iconSize} />
          ) : (
            <Icon color={iconColor} size={iconSize} />
          )}
        </div>
        <div className="font-bold text-white no-underline hover:underline pl-3">
          {text}
        </div>
      </div>
    </NavLink>
  );
}

function Tabs({
  active,
  setActive,
}: {
  active: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
}) {
  const tabs = [
    {
      path: "/",
      Icon: active === "/" ? CloudArrowUpFill : CloudArrowUp,
      text: "File Upload",
    },
    {
      path: "/peer",
      Icon: active === "/peer" ? DatabaseFillAdd : DatabaseAdd,
      text: "Peer",
    },
    {
      path: "/dashboard",
      Icon: active === "/dashboard" ? PersonFillGear : PersonGear,
      text: "Dashboard",
    },
    {
      path: "/market",
      Icon: active === "/market" ? CartFill : Cart,
      text: "Market",
    },
    {
      path: "/wallet",
      Icon: active === "/wallet" ? WalletFill : Wallet,
      text: "Wallet",
    },
    {
      path: "/setting",
      Icon: active === "/setting" ? GearFill : Gear,
      text: "Setting",
    },
  ];

  return (
    // <div className="tabs">
    <div className="pt-2 px-4 flex flex-col gap-20 mt-16 ">
      {tabs.map((tab) => (
        <Tab
          key={tab.path}
          path={tab.path}
          active={active === tab.path}
          onClick={() => setActive(tab.path)}
          Icon={tab.Icon}
          text={tab.text}
        />
      ))}
    </div>
  );
}

export default function Menu() {
  const [active, setActive] = useState(window.location.pathname);

  return (
    // <div className="menu">
    <div className="flex flex-col  h-full bg-blue-900 bg-opacity-85 ">
      <NavLink to="/help" onClick={() => setActive("/help")}>
        <Logo fill="white" />
      </NavLink>
      <Tabs active={active} setActive={setActive} />
    </div>
  );
}
