import { BillboardColumns } from "@/app/(root)/(routes)/store/[storeId]/billboard/[billboardId]/components/column";
import { DataTable } from "@/components/table/data-table";
import Api from "@/components/ui/api";
import { Button, buttonVariants } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { getBillboardsByStoreId } from "@/lib/actions/billboard";
import { getProductsByStoreId } from "@/lib/actions/products";
import { cn, formatter } from "@/lib/utils";
import { PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import {
  ProductsColumnType,
  ProductsColumns,
} from "./[productId]/components/column";
import { format } from "date-fns";

export default async function BillboardPage({
  params,
}: {
  params: { storeId: string };
}) {
  const products = await getProductsByStoreId(params.storeId);

  const formattedProducts: ProductsColumnType[] = products.map((product) => ({
    id: product.id,
    name: product.name,
    category: product.category.name,
    size: product.size.name,
    price: formatter.format(product.price),
    color: product.color.value,
    createdAt: format(product.createdAt, "MMMM do, yyyy"),
    isArchieved: product.isArchieved,
    isFeatured: product.isFeatured,
  }));

  return (
    <div className="min-h-[calc(100vh-5rem)] max-w-7xl mx-auto px-5">
      <div className="flex flex-row justify-between items-center">
        <Heading title="Products" subtitle="All your Products here" />
        <Link
          className={cn(
            buttonVariants({
              variant: "ghost",
              size: "icon",
            })
          )}
          href={`/store/${params.storeId}/products/new`}
        >
          <PlusIcon className="h-6 w-6" />
        </Link>
      </div>
      <DataTable columns={ProductsColumns} data={formattedProducts} />

      <Api entityName="products" entityIdName="productId" />
    </div>
  );
}
