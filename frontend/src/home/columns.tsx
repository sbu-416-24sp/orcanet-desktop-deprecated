import React, { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";

export type Activity = {
  id: number;
  name: string;
  size: string;
  hash: string;
  status: string;
  showDropdown?: boolean;
  peers?: number;
  isEditing?: boolean;
  isSelected?: boolean;
};

export const getColumns = (
  toggleDropdown: (id: number) => void,
  updateActivityName: (id: number, newName: string) => void,
  toggleEdit: (id: number) => void,
  removeAllSelected: () => void,
  updateSelection: (id: number, isSelected: boolean) => void,
  updateAllSelections: (isSelected: boolean) => void 

): ColumnDef<Activity>[] => {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <>
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => {
              table.toggleAllPageRowsSelected(!!value);
              updateAllSelections(!!value); // Use the new callback here
            }}
            aria-label="Select all"
          />
          <button onClick={() => table.toggleAllPageRowsSelected(false)}>
            Unselect All
          </button>
          <button onClick={removeAllSelected}>Remove Selected</button>
        </>
      ),
      cell: ({ row }) => (
        <div className={`row ${row.getIsSelected() ? "selected-row" : ""}`}>
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => {
              row.toggleSelected(!!value);
              updateSelection(row.original.id, !!value);
            }}
            aria-label="Select row"
          />
        </div>
      ),
    },
    {
      accessorKey: "name",
      header: "File Name",
      cell: ({ row }) => {
        if (row.original.isEditing) {
          return (
            <input
              type="text"
              defaultValue={row.original.name}
              onBlur={(e) => {
                updateActivityName(row.original.id, e.target.value);
                toggleEdit(row.original.id);
              }}
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.currentTarget.blur();
                }
              }}
            />
          );
        }
        return (
          <div>
            {row.original.name}
            <div style={{ color: "gray", fontSize: "smaller" }}>
              {row.original.hash}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      accessorKey: "size",
      header: "Size",
    },
    {
      accessorKey: "peers",
      header: "Peers",
      cell: ({ row }) => (
        <div className="text-right">{row.getValue("peers") || "-"}</div>
      ),
    },
    {
      id: "dropdown",
      header: () => null,
      cell: ({ row }) => (
        <div className="relative">
          <button onClick={() => toggleDropdown(row.original.id)}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>
          {row.original.showDropdown && (
            <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20 border border-blue-200">
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-b border-gray-200"
              >
                Download
              </a>
              <div
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-b border-gray-200 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  toggleEdit(row.original.id);
                  // const newName = prompt("Enter the new name for the file:");
                  // if (newName) {
                  //   updateActivityName(row.original.id, newName);
                  // }
                }}
              >
                Rename
              </div>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-b border-gray-200"
              >
                View File Details
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Copy CID
              </a>
            </div>
          )}
        </div>
      ),
    },
  ];
};
