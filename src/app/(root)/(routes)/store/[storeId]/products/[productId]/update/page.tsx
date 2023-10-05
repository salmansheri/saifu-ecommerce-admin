import ProductForm from "@/components/forms/products-form";
import { getColorsByStoreId } from "@/lib/actions/colors";
import { getGenders } from "@/lib/actions/genders";
import { getSizesByStoreId } from "@/lib/actions/sizes";
import { prisma } from "@/lib/db";

interface UpdateProductPageProps {
  params: {
    storeId: string;
    productId: string;
  };
}

export default async function UpdateProductPage({
  params,
}: UpdateProductPageProps) {
  const colors = await getColorsByStoreId(params.storeId);
  const genders = await getGenders();
  const sizes = await getSizesByStoreId(params.storeId);
  const product = await prisma.product.findUnique({
    where: {
      id: params.productId,
      storeId: params.storeId,
    },
    include: {
      category: true,
      color: true,
      size: true,
      gender: true,
      images: true,
      store: true,
    },
  });
  const categories = await prisma.category.findMany({
    where: {
      storeId: params.storeId,
    },
  });
  return (
    <>
      <ProductForm
        colors={colors}
        genders={genders}
        initialData={product!}
        categories={categories}
        sizes={sizes}
      />
    </>
  );
}
