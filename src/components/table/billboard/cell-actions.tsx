"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  DotsHorizontalIcon,
  TrashIcon,
  UpdateIcon,
} from "@radix-ui/react-icons";
import { BillboardColumnType } from "./column";
import { CopyIcon } from "@radix-ui/react-icons";
import { useMutation } from "@tanstack/react-query";
interface CellActionsType {
  data: BillboardColumnType;
}

const CellActions: React.FC<CellActionsType> = ({ data }) => {
  const { mutate: onUpdate } = useMutation({
    mutationFn: async () => {},
  });
  const { mutate: onDelete } = useMutation({
    mutationFn: async () => {},
  });
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <DotsHorizontalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(data.id)}
          className=" flex gap-x-2"
        >
          <CopyIcon className="h-6 w-6" />
          Copy Billboard ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex gap-x-2">
          <TrashIcon className="text-red-500 h-6 w-6" /> Delete
        </DropdownMenuItem>
        <DropdownMenuItem className="flex gap-x-2">
          <UpdateIcon className="text-blue-500 h-6 w-6" />
          Update
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CellActions;
