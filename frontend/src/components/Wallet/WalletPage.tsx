import { motion } from "framer-motion";
import { routeVariants } from "../../helper/RouterAnimation";
import { useState, useEffect } from "react";
import { columns } from "./columns";
import IPayment from "@/interfaces/IPayment";
import { Button } from "@/components/ui/button";
import { DataTable } from "./data-table";
import QRCode from "react-qr-code";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "../Header/Header";

async function getData(): Promise<IPayment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "59a53ee428a643e940546c5ccfc5663e",
      amount: -0.5523342,
      status: "pending",
    },
    {
      id: "f0623b42ea2d521b945a80b014f5694b",
      amount: 0.000012323,
      status: "failed",
    },
    {
      id: "061b96f36e163ef82de2feefe7d7aaba",
      amount: -0.8311008,
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
  const [data, setData] = useState<IPayment[]>([]);

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
        <Card className="container ">
          <CardHeader>
            <CardTitle>Balance: 1024.576</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid justify-items-center">
              <QRCode value={"https://www.youtube.com/watch?v=dQw4w9WgXcQ"} />
              <p className="mt-4">
                12D3KooWM1J3AZKnEvVtEVjwFka2Z2Z9EZo5XVzUoyrAofWRUUWK
              </p>
              <div>
                <Button className="">Send</Button>
                <Button className="ml-4">Request</Button>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="container mx-auto mt-3">
          <p>Transactions</p>
          {data.length > 0 ? (
            <DataTable columns={columns} data={data} />
          ) : (
            <div>Loading Transactions...</div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
