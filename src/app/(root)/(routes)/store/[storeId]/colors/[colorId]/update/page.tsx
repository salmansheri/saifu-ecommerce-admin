import ColorForm from "@/components/forms/color-form";
import { getColorById } from "@/lib/actions/colors";

export default async function UpdateBillboardPage({
  params,
}: {
  params: { colorId: string; storeId: string };
}) {
  const color = await getColorById(params.colorId);

  return (
    <div>
      <ColorForm initialData={color} />
    </div>
  );
}
