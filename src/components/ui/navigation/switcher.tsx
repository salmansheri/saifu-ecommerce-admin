"use client";

import * as React from "react";
import { CaretSortIcon, CheckIcon, PlusIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Store } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Separator } from "@radix-ui/react-dropdown-menu";

interface SwitcherProps {
  stores: Store[] | null;
  storeName?: string;
}

export default function Switcher({ stores, storeName }: SwitcherProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(storeName);
  const router = useRouter();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? stores?.find((store) => store.name === value)?.name
            : "Select Store..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." className="h-9" />
          <CommandEmpty>No Store Found</CommandEmpty>
          <CommandGroup>
            {stores?.map((store) => (
              <CommandItem
                key={store.name}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <span
                  onClick={() => {
                    router.refresh();
                    router.push(`/store/${store.id}/update`);
                  }}
                >
                  {store.name}
                </span>

                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    value === store.name ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
            <Separator className="my-2" />
            <CommandItem className="space-y-3">
              <span
                onClick={() => router.push(`/store/new`)}
                className="flex flex-row gap-x-2 items-center"
              >
                <PlusIcon />
                Create New Store
              </span>
            </CommandItem>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
