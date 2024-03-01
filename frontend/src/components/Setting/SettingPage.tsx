import { motion } from "framer-motion";
import { routeVariants } from "../../helper/RouterAnimation";

import MainSetting from "./MainSetting";
import OrcaCoinConnection from "./OrcaCoinConnection";


export default function SettingPage() {
  return (
    <motion.div
      className="content setting"
      initial="initial"
      animate="final"
      variants={routeVariants}
    >
      <MainSetting />
      <OrcaCoinConnection />
    </motion.div>
  );
}
