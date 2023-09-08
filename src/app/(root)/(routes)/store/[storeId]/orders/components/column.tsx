"use client";

import { ColumnDef } from "@tanstack/react-table";

export type OrderColumnType = {
  id: string;
  isPaid: boolean;
  address: string;
  totalPrice: string;
  products: string;
  phone: string;
  createdAt: string;
};

export const OrderColumns: ColumnDef<OrderColumnType>[] = [
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "totalPrice",
    header: "TotalPrice",
  },
  {
    accessorKey: "isPaid",
    header: "Paid",
  },
];
