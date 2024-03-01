import Traffic from "../../images/netTraffic.png";
import Bandwidth from "../../images/bandwidthGraph.png";
import Header from "../Header/Header";

function Graph({
  className,
  title,
  graph,
}: {
  className: string;
  title: string;
  graph: string;
}) {
  return (
    <div className={className}>
      <h3>{title}</h3>
      <img src={graph} alt="Network Data" />
    </div>
  );
}

export default function Metric() {
  return (
    <div className="metric">
      <Header />
      <Graph
        className="bandwidth-graph"
        title="BANDWIDTH OVER TIME"
        graph={Bandwidth}
      />
      <Graph
        className="traffic-meter"
        title="TRAFFIC OVER TIME"
        graph={Traffic}
      />
    </div>
  );
}
