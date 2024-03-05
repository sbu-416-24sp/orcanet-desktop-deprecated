import { motion } from "framer-motion";
import { routeVariants } from "../../helper/RouterAnimation";
import ReactGlobe, { GlobeMethods } from "react-globe.gl";
import { useEffect, useRef } from "react";
import { useWindowSize } from "../../helper/CustomHooks";

export default function PeerPage() {
  const globeRef = useRef<GlobeMethods>(),
    [width, height]: number[] = useWindowSize();

  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 1;
      globeRef.current.pointOfView({ lat: 0, lng: 0, altitude: 1.85 });
    }
  }, []);

  return (
    <motion.div
      // className="content peer-page"
      className="h-full w-full bg-blue-100 bg-opacity-50"
      initial="initial"
      animate="final"
      variants={routeVariants}
    >

      <ReactGlobe
        ref={globeRef}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        animateIn={true}
        width={width}
        height={height}
      />
    </motion.div>
  );
}
