"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import CellActions from "./cell-actions";

export type ProductsColumnType = {
  id: string;
  name: string;
  price: string;
  size: string;
  category: string;
  color: string;
  isFeatured: boolean;
  isArchieved: boolean;
  createdAt: string;
  gender: string;
};

export const ProductsColumns: ColumnDef<ProductsColumnType>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "isArchieved",
    header: "Archieved",
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "color",
    header: "Color",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original.color}
        <div
          className="h-6 w-6 rounded-full border"
          style={{
            backgroundColor: row.original.color,
          }}
        ></div>
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <CellActions data={row.original} />;
    },
  },
];
