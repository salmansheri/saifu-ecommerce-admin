"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import CellActions from "./cell-actions";

export type SizeColumsType = {
  id: string;
  name: string;
  value: string;
};

export const SizeColumn: ColumnDef<SizeColumsType>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
  },

  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      return <CellActions data={row.original} />;
    },
  },
];
