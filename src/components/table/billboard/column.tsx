"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import CellActions from "./cell-actions";

export type BillboardColumnType = {
  id: string;
  label: string;
};

export const BillboardColumns: ColumnDef<BillboardColumnType>[] = [
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <CellActions data={row.original} />;
    },
  },
];
