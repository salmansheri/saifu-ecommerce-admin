import { DataTable } from "@/components/table/data-table";
import Api from "@/components/ui/api";
import { buttonVariants } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { getCategoriesByStoreId } from "@/lib/actions/categories";
import { cn } from "@/lib/utils";
import { PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { ColorColumn } from "./[colorId]/components/column";
import { getColorsByStoreId } from "@/lib/actions/colors";

export default async function ColorPage({
  params,
}: {
  params: { storeId: string };
}) {
  const colors = await getColorsByStoreId(params.storeId);

  return (
    <div className="min-h-[calc(100vh-5rem)] max-w-7xl mx-auto px-5">
      <div className="flex flex-row justify-between items-center">
        <Heading title="Colors" subtitle="All your Colors here" />
        <Link
          className={cn(
            buttonVariants({
              variant: "ghost",
              size: "icon",
            })
          )}
          href={`/store/${params.storeId}/colors/new`}
        >
          <PlusIcon className="h-6 w-6" />
        </Link>
      </div>
      <DataTable columns={ColorColumn} data={colors} />

      <Api title="Categories" />
    </div>
  );
}
