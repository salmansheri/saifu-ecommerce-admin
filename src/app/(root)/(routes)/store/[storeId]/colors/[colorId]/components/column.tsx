"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import CellActions from "./cell-actions";

export type ColorColumsType = {
  id: string;
  name: string;
  value: string;
};

export const ColorColumn: ColumnDef<ColorColumsType>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original.value}
        <div
          className="h-6 w-6 rounded-full"
          style={{ backgroundColor: row.original.value }}
        ></div>
      </div>
    ),
  },

  {
    id: "actions",
    cell: ({ row }) => {
      return <CellActions data={row.original} />;
    },
  },
];
