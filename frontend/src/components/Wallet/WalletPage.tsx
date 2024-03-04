import { motion } from "framer-motion";
import { routeVariants } from "../../helper/RouterAnimation";
import { Button } from "@/components/ui/button";

import Header from "../Header/Header";

export default function WalletPage() {
  return (
    <motion.div
      // className="content file-upload-page"
      className="p-8 h-full bg-blue-100 bg-opacity-50"
      initial="initial"
      animate="final"
      variants={routeVariants}
    >
      <Header />
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Bitcoin Wallet</h1>
        <p className="text-gray-500 mb-8">
          Manage your Bitcoin transactions and balances.
        </p>
        <Button className="mb-4">Send Bitcoin</Button>
        <Button className="mb-4">Receive Bitcoin</Button>
        <Button className="mb-4">View Transaction History</Button>
      </div>
    </motion.div>
  );
}
