import OrcaCoin from "../../svgs/orcaCoin.svg";
// import SideBarLogo from "../../svgs/OrcaNetLogo.tsx";

export default function UserInfoPanel() {
  return (
    <div className="bg-gray-50 p-12 h-full">
      <div className="info">
        <h2 className="text-xl md:text-2xl font-semibold text-cyan-800 ">
          Welcome to OrcaNet
        </h2>
        <h3 className="text-lg md:text-xl font-semibold pt-4">
          Node Connected
        </h3>
        <div className="flex items-center pt-4">
          <h3 className="font-semibold mr-2">Balance:</h3>
          <span className="flex items-center">
            <img src={OrcaCoin} alt="Orca Coin" className="h-5 w-5 mr-1" />
            <span className="text-cyan-800 font-bold">1000</span>
          </span>
        </div>
        <div className="pt-16">
          <h3 className="font-semibold">Peer ID:</h3>
          <p className="text-cyan-800 font-bold break-all m-0">
            12D3KooWM1J3AZKnEvVtEVjwFka2Z2Z9EZo5XVzUoyrAofWRUUWK
          </p>
        </div>
        <div className="pt-4">
          <h3 className="font-semibold">Public Key:</h3>
          <p className="text-cyan-800 font-bold break-all m-0">
            CAESIKY9RkdcwVuPzyQPn2SX7CEJRIj87Y1Mxtm0S5ABQMvI
          </p>
        </div>
        <div className="pt-16">
          <h3 className="font-semibold">Gateway:</h3>
          <a className="text-cyan-800 font-bold break-all m-0">
            http://127.0.0.1:8080
          </a>
        </div>
      </div>
      {/* <div className="mt-8 md:mt-12 ">
        <SideBarLogo fill="#12486b" />
      </div> */}
    </div>
  );
}
