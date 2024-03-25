//format.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";

import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Checkbox } from "@/components/ui/checkbox";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Item = {
  status: 'Successful' | 'Pending' | 'Failed';
  time: string;
  transactionId: string;
  amount: number;
  type: 'send' |'request';
};

export const columns: ColumnDef<Item>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
        <div className="text-right">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "time",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Time
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-right">
        {(() => {
          const timeValue = row.getValue("time") as string;
          const timeDate = new Date(timeValue);
          const now = new Date();
          const difference = now.getTime() - timeDate.getTime();
          const hours = Math.floor(difference / 3600000);
          const minutes = Math.floor((difference % 3600000) / 60000);
          const seconds = Math.floor((difference % 60000) / 1000);

          if (hours > 23) {
            return `${timeDate.toLocaleDateString()} ${timeDate.toLocaleTimeString()}`;
          } else if (hours > 0) {
            return `${hours} hour(s) ago`;
          } else if (minutes > 0) {
            return `${minutes} minute(s) ago`;
          } else {
            return `${seconds} second(s) ago`;
          }
        })()}
      </div>
    ),
  },
  {
    accessorKey: "transactionId",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Transaction Id
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-right">{row.getValue("transactionId")}</div>
    ),
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
        const amount = row.original.amount;
        const type = row.original.type;
        const formattedAmount = type === 'send' ? `-${amount}` : `+${amount}`;
        const color = type === 'send' ? 'red' : 'green';
        return (
          <div className="text-right" style={{ color: color }}>
            {formattedAmount}
          </div>
        );
      },
   },
];