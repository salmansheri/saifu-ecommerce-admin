import { DataTable } from "@/components/table/data-table";
import Api from "@/components/ui/api";
import { buttonVariants } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { prisma } from "@/lib/db";
import { cn, formatter } from "@/lib/utils";
import { PlusIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import Link from "next/link";
import {
  ProductsColumnType,
  ProductsColumns,
} from "./[productId]/components/column";

export default async function ProductsPage({
  params,
}: {
  params: { storeId: string };
}) {
  const products = await prisma.product.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      category: true,
      size: true,
      color: true,
      gender: true,
    },
  });

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
    gender: product.gender.name,
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
