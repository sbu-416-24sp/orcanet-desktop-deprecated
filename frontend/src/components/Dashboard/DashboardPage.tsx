import { motion } from "framer-motion";
import { routeVariants } from "../../helper/RouterAnimation.ts";

import Metric from "./Metric";
import UserInfo from "./UserInfoPanel.tsx";

export default function DashboardPage() {
  return (
    <motion.div
      className="content dashboard-page"
      initial="initial"
      animate="final"
      variants={routeVariants}
    >
      <Metric />
      <UserInfo />
    </motion.div>
  );
}
