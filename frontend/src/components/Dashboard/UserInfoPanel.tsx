import OrcaCoin from "../../svgs/orcaCoin.svg";
import SideBarLogo from "../../svgs/OrcaNetLogo.tsx";

export default function UserInfoPanel() {
  return (
    <div className="user-info-panel">
      <div className="info">
        <h2>Welcome to OrcaNet</h2>
        <h3>Node Connected</h3>
        <div className="balance">
          <h3>Balance: </h3>
          <span>
            <img src={OrcaCoin} alt="Orca Coin" /> 1000
          </span>
        </div>
        <div className="peer-id">
          <h3>Peer ID: </h3>
          <p>12D3KooWM1J3AZKnEvVtEVjwFka2Z2Z9EZo5XVzUoyrAofWRUUWK</p>
        </div>
        <div className="public-key">
          <h3>Public Key: </h3>
          <p>CAESIKY9RkdcwVuPzyQPn2SX7CEJRIj87Y1Mxtm0S5ABQMvI</p>
        </div>
        <div className="gateway">
          <h3>Gateway: </h3>
          <p>http://127.0.0.1:8080</p>
        </div>
      </div>
      <div className="logo">
        <SideBarLogo fill="#12486b" />
      </div>
    </div>
  );
}
