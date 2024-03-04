"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "id",
    header: "Transaction ID",
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      return <div className="text-right font-medium">{amount}</div>;
    },
  },
];
