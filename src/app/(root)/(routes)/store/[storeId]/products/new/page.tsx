import BillboardForm from "@/components/forms/billboard-form";
import ProductForm from "@/components/forms/products-form";
import { getCategoriesByStoreId } from "@/lib/actions/categories";
import { getColorsByStoreId } from "@/lib/actions/colors";
import { getSizesByStoreId } from "@/lib/actions/sizes";

export default async function CreateBillboardPage({
  params,
}: {
  params: { storeId: string };
}) {
  const categories = await getCategoriesByStoreId(params.storeId);
  const colors = await getColorsByStoreId(params.storeId);
  const sizes = await getSizesByStoreId(params.storeId);

  return (
    <div>
      <ProductForm colors={colors} sizes={sizes} categories={categories} />
    </div>
  );
}
