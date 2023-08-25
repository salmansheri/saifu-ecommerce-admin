"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import CellActions from "./cell-actions";

export type CategoryColumsType = {
  id: string;
  name: string;
  billboard: string;
};

export const CategoryColumn: ColumnDef<CategoryColumsType>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },

  {
    id: "actions",
    cell: ({ row }) => {
      return <CellActions data={row.original} />;
    },
  },
];
