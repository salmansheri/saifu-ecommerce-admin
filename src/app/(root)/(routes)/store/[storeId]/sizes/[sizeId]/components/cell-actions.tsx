"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";
import {
  CopyIcon,
  DotsHorizontalIcon,
  TrashIcon,
  UpdateIcon,
} from "@radix-ui/react-icons";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { SizeColumsType } from "./column";

interface CellActionsType {
  data: SizeColumsType;
}

const CellActions: React.FC<CellActionsType> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  const { mutate: onDelete } = useMutation({
    mutationFn: async () => {
      await axios.delete(`/api/store/${params.storeId}/sizes/${data.id}`);
    },
    onError: (error) => {
      return toast({
        title: "Cannot Delete",
        description: "Please Try Again",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      router.refresh();
      return toast({
        title: "Deleted Successfully",
        description: "Store Deleted Successfully",
      });
    },
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
          Copy color ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex gap-x-2" onClick={() => onDelete()}>
          <TrashIcon className="text-red-500 h-6 w-6" /> Delete
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex gap-x-2"
          onClick={() =>
            router.push(`/store/${params.storeId}/sizes/${data.id}/update`)
          }
        >
          <UpdateIcon className="text-blue-500 h-6 w-6" />
          Update
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CellActions;
