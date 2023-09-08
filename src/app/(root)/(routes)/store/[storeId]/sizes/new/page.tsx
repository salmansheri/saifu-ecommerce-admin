import SizesForm from "@/components/forms/sizes-form";

export default async function CreateCategoryPage({
  params,
}: {
  params: { storeId: string };
}) {
  return (
    <div>
      <SizesForm />
    </div>
  );
}
