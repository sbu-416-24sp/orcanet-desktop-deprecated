import { motion } from "framer-motion";
import { routeVariants } from "../helper/RouterAnimation";
import { MapContainer, TileLayer, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import Header from "./Header/Header";

function MapContent() {
  return (
    <MapContainer
      className="my-3 bandwidth-graph"
      center={[25.505, 20.09]}
      zoom={2}
      maxBounds={[
        [-90, -180],
        [90, 180],
      ]}
      style={{ height: "400px", width: "100%" }}
      dragging={false}
      doubleClickZoom={false}
      zoomControl={false}
      scrollWheelZoom={false}
      touchZoom={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {/* <Marker position={[0, 0]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker> */}
      <Circle
        center={[21, 20]}
        radius={250}
        weight={10}
        opacity={0.5}
        fillOpacity={0.75}
      >
        <Popup>
          Node at [21, 20] <br /> Easily customizable.
        </Popup>
      </Circle>
      <Circle
        center={[10, 30]}
        radius={250}
        weight={10}
        opacity={0.5}
        fillOpacity={0.75}
      >
        <Popup>
          Node at [10, 30] <br /> Easily customizable.
        </Popup>
      </Circle>
      <Circle
        center={[10, 50]}
        radius={250}
        weight={10}
        opacity={0.5}
        fillOpacity={0.75}
      >
        <Popup>
          Node at [10, 50] <br /> Easily customizable.
        </Popup>
      </Circle>
      <Circle
        center={[39, 116]}
        radius={250}
        weight={10}
        opacity={0.5}
        color="red"
        fillColor="red"
        fillOpacity={0.75}
      >
        <Popup>
          Node at [39, 116] <br /> Beijing
        </Popup>
      </Circle>
    </MapContainer>
  );
}

function PeersList() {
  return (
    <table className="table peer-list" style={{ borderRadius: "8px" }}>
      <thead>
        <tr style={{ borderRadius: "8px" }}>
          <th>Location</th>
          <th>Latency</th>
          <th>Peer ID</th>
          <th>Connection</th>
          <th>Open Streams</th>
        </tr>
      </thead>
      <tbody className="table-group-divider">
        <tr>
          <td>United States</td>
          <td>120ms</td>
          <td></td>
          <td>ip4 ~ tcp</td>
          <td>/ipfs/bit</td>
        </tr>
      </tbody>
    </table>
  );
}

export default function PeerPage() {
  return (
    <motion.div
      className="content peer-page"
      initial="initial"
      animate="final"
      variants={routeVariants}
    >
      <Header />
      <MapContent />
      <PeersList />
    </motion.div>
  );
}
