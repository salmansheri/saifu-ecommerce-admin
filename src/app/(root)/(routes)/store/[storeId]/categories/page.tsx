import { DataTable } from "@/components/table/data-table";
import Api from "@/components/ui/api";
import { buttonVariants } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { getCategoriesByStoreId } from "@/lib/actions/categories";
import { cn } from "@/lib/utils";
import { PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { CategoryColumn } from "./[categoriesId]/components/column";

export default async function CategoryPage({
  params,
}: {
  params: { storeId: string };
}) {
  const categories = await getCategoriesByStoreId(params.storeId);

  const formattedCategories = categories.map((category) => ({
    id: category.id,
    name: category.name,
    billboard: category.billboard,
  }));

  return (
    <div className="min-h-[calc(100vh-5rem)] max-w-7xl mx-auto px-5">
      <div className="flex flex-row justify-between items-center">
        <Heading title="Categories" subtitle="All your Categories here" />
        <Link
          className={cn(
            buttonVariants({
              variant: "ghost",
              size: "icon",
            })
          )}
          href={`/store/${params.storeId}/categories/new`}
        >
          <PlusIcon className="h-6 w-6" />
        </Link>
      </div>

      <DataTable columns={CategoryColumn} data={formattedCategories} />
      <Api entityIdName="categoryId" entityName="categories" />
    </div>
  );
}
