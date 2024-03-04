import { motion } from "framer-motion";
import { routeVariants } from "../../helper/RouterAnimation";
import { useState, useEffect } from "react";
import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";
import Header from "../Header/Header";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "59a53ee428a643e940546c5ccfc5663e",
      amount: 0.5523342,
      status: "pending",
    },
    {
      id: "f0623b42ea2d521b945a80b014f5694b",
      amount: 0.000012323,
      status: "failed",
    },
    {
      id: "061b96f36e163ef82de2feefe7d7aaba",
      amount: 0.8311008,
      status: "processing",
    },
    {
      id: "bcaeff20734041e27098eb5138b3003a",
      amount: 0.00432,
      status: "success",
    },
    // ...
  ];
}

export default function DemoPage() {
  const [data, setData] = useState<Payment[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getData();
      setData(result);
    };

    fetchData();
  }, []);

  return (
    <motion.div
      className="p-8 h-full bg-blue-100 bg-opacity-50"
      initial="initial"
      animate="final"
      variants={routeVariants}
    >
      <div>
        <Header />
        <div className="container mx-auto py-10">
          {data.length > 0 ? (
            <DataTable columns={columns} data={data} />
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
