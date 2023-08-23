import { BillboardColumns } from "@/components/table/billboard/column";
import { DataTable } from "@/components/table/data-table";
import Api from "@/components/ui/api";
import { getBillboardsByStoreId } from "@/lib/actions/billboard";

export default async function BillboardPage({
  params,
}: {
  params: { storeId: string };
}) {
  const billboards = await getBillboardsByStoreId(params.storeId);

  return (
    <div className="min-h-[calc(100vh-5rem)] max-w-7xl mx-auto">
      <DataTable columns={BillboardColumns} data={billboards} />

      <Api />
    </div>
  );
}
