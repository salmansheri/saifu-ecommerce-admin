import CategoryForm from "@/components/forms/category-form";
import { getBillboardsByStoreId } from "@/lib/actions/billboard";

export default async function CreateCategoryPage({
  params,
}: {
  params: { storeId: string };
}) {
  const billboards = await getBillboardsByStoreId(params.storeId);
  return (
    <div>
      <CategoryForm billboards={billboards} />
    </div>
  );
}
