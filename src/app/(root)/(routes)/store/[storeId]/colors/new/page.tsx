import ColorForm from "@/components/forms/color-form";

export default async function CreateCategoryPage({
  params,
}: {
  params: { storeId: string };
}) {
  return (
    <div>
      <ColorForm />
    </div>
  );
}
