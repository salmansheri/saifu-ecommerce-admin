import { BillboardColumns } from "@/app/(root)/(routes)/store/[storeId]/billboard/[billboardId]/components/column";
import { DataTable } from "@/components/table/data-table";
import Api from "@/components/ui/api";
import { Button, buttonVariants } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { getBillboardsByStoreId } from "@/lib/actions/billboard";
import { cn } from "@/lib/utils";
import { PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default async function BillboardPage({
  params,
}: {
  params: { storeId: string };
}) {
  const billboards = await getBillboardsByStoreId(params.storeId);

  const formattedBillboards = billboards.map((billboard) => ({
    id: billboard.id,
    label: billboard.label,
  }));

  return (
    <div className="min-h-[calc(100vh-5rem)] max-w-7xl mx-auto px-5">
      <div className="flex flex-row justify-between items-center">
        <Heading title="Billboards" subtitle="All your Billboards here" />
        <Link
          className={cn(
            buttonVariants({
              variant: "ghost",
              size: "icon",
            })
          )}
          href={`/store/${params.storeId}/billboard/new`}
        >
          <PlusIcon className="h-6 w-6" />
        </Link>
      </div>
      <DataTable columns={BillboardColumns} data={formattedBillboards} />

      <Api entityIdName="billboardId" entityName="billboard" />
    </div>
  );
}
