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
    <NavLink to={path}>
      <div className="tab" onClick={onClick}>
        <div>
          {active ? (
            <Icon color={iconColor} size={iconSize} />
          ) : (
            <Icon color={iconColor} size={iconSize} />
          )}
        </div>
        <div className="tab-text">{text}</div>
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
      path: "/setting",
      Icon: active === "/setting" ? GearFill : Gear,
      text: "Setting",
    },
  ];

  return (
    <div className="tabs">
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
    <div className="menu">
      <NavLink to="/" onClick={() => setActive("/")}>
        <Logo fill="white" />
      </NavLink>
      <Tabs active={active} setActive={setActive} />
    </div>
  );
}
