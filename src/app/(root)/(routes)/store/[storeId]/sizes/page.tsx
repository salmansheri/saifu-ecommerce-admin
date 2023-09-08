import { DataTable } from "@/components/table/data-table";
import Api from "@/components/ui/api";
import { buttonVariants } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { getSizesByStoreId } from "@/lib/actions/sizes";
import { cn } from "@/lib/utils";
import { PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { SizeColumn } from "./[sizeId]/components/column";

export default async function SizePage({
  params,
}: {
  params: { storeId: string };
}) {
  const sizes = await getSizesByStoreId(params.storeId);

  const formattedSizes = sizes.map((size) => ({
    id: size.id,
    name: size.name,
    value: size.value,
  }));

  return (
    <div className="min-h-[calc(100vh-5rem)] max-w-7xl mx-auto px-5">
      <div className="flex flex-row justify-between items-center">
        <Heading title="Sizes" subtitle="All your Sizes here" />
        <Link
          className={cn(
            buttonVariants({
              variant: "ghost",
              size: "icon",
            })
          )}
          href={`/store/${params.storeId}/sizes/new`}
        >
          <PlusIcon className="h-6 w-6" />
        </Link>
      </div>
      <DataTable columns={SizeColumn} data={formattedSizes} />

      <Api entityIdName="sizeId" entityName="sizes" />
    </div>
  );
}
