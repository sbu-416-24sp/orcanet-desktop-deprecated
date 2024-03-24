import React, { useState, useRef } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  FilterFnOption,
} from "@tanstack/react-table";

import SearchBar from "./SearchBar";

import { generateFileHash } from "./sizeUtils";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Activity } from "./columns";

interface DataTableProps {
  columns: ColumnDef<Activity>[];
  data: Activity[];
  totalSize: string;
  onFileAdded: (file: File) => Promise<void>;
}

export function DataTable({
  columns,
  data,
  totalSize,
  onFileAdded,
}: DataTableProps) {
  const [globalFilter, setGlobalFilter] = useState("");
  const totalSizeBytes = 1;
  const fileInputRef = useRef<HTMLInputElement>(null);



  const fuzzyTextFilterFn: FilterFnOption<Activity> = (
    row,
    columnId,
    value,
    addMeta
  ) => {
    const cellValue = row.original["hash"];
    return cellValue && typeof cellValue === "string"
      ? cellValue.toLowerCase().includes(value.toLowerCase())
      : false;
  };

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyTextFilterFn,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="flex flex-col py-4">
      <div className="mb-2">
        <SearchBar
          value={globalFilter}
          onChange={(value) => setGlobalFilter(String(value))}
        />
      </div>

      <div className="flex items-center py-4">
        <div className="w-full">
          <section className="mb-1 mt-1 mr-2 ml-auto flex flex-row  p-0.5 rounded-t font-mono w-full">
            <div className="flex justify-between items-center w-full">
              <div className="flex flex-row items-center justify-center w-1/2">
                <h3 className="text-lg font-semibold text-black">
                  {data.length} 
                </h3>
                <span className="text-sm font-medium text-gray-600 ml-1">
                {data.length === 1 ? "file" : "files"}
                </span>
              </div>
              <div className="flex flex-row items-center justify-center w-1/2">
                <h3 className="text-lg font-semibold text-black mr-2">
                  {totalSize}
                </h3>
                <span className="text-sm font-medium text-gray-600">
                   Total Size
                </span>
              </div>

              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={async (e) => {
                  const file = e.target.files ? e.target.files[0] : null;
                  if (file) {
                    await onFileAdded(file);
                  }
                }}
              />
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-6 ml-2 rounded text-sm whitespace-nowrap"
                onClick={() => fileInputRef.current?.click()}
              >
                + Import
              </button>
            </div>
          </section>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
