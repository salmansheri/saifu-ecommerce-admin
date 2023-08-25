import CategoryForm from "@/components/forms/category-form";
import { getBillboardsByStoreId } from "@/lib/actions/billboard";
import { getCategoryById } from "@/lib/actions/categories";

export default async function UpdateBillboardPage({
  params,
}: {
  params: { categoriesId: string; storeId: string };
}) {
  const category = await getCategoryById(params.categoriesId);
  const billboards = await getBillboardsByStoreId(params.storeId);

  return (
    <div>
      <CategoryForm initialData={category} billboards={billboards} />
    </div>
  );
}
