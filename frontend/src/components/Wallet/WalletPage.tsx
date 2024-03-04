import { motion } from "framer-motion";
import { routeVariants } from "../../helper/RouterAnimation";
import { useState, useEffect } from "react";
import { Payment, columns } from "./columns";
import { Button } from "@/components/ui/button";
import { DataTable } from "./data-table";
import QRCode from "react-qr-code";
import OrcaCoin from "../../svgs/orcaCoin.svg";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Header from "../Header/Header";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "59a53ee428a643e940546c5ccfc5663e",
      amount: -0.5523342,
      status: "pending",
      note: "BananaHub.mp4",
      date: new Date("2021-10-10"),
    },
    {
      id: "f0623b42ea2d521b945a80b014f5694b",
      amount: 0.000012323,
      status: "failed",
      note: "Dota2_OnePunchGodModeMenu.exe",
      date: new Date("2021-10-10"),
    },
    {
      id: "061b96f36e163ef82de2feefe7d7aaba",
      amount: -0.8311008,
      status: "processing",
      note: "PayPaiBalanceInjector.bin",
      date: new Date("2021-10-10"),
    },
    {
      id: "b8ae1f8845ee9cbe64174ae089973b56",
      amount: 0.663450023,
      status: "processing",
      note: "",
      date: new Date("2021-10-10"),
    },
    {
      id: "bcaeff20734041e27098eb5138b3003a",
      amount: 0.00432,
      status: "success",
      note: "きかんしゃトーマス.avi",
      date: new Date("2021-10-10"),
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
        <Card className="container ">
          <CardHeader>
            <CardDescription className="text-base font-medium">
              Balance
            </CardDescription>
            <CardTitle className="flex justify-items-center">
              <img src={OrcaCoin} alt="Orca Coin" className="mr-2 h-10" />
              <div className="text-4xl font-bold">1024.576</div>
            </CardTitle>
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
