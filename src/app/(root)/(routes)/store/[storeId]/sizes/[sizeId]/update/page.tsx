import ColorForm from "@/components/forms/color-form";
import SizesForm from "@/components/forms/sizes-form";
import { getColorById } from "@/lib/actions/colors";
import { getSizeById } from "@/lib/actions/sizes";

export default async function UpdateSizePage({
  params,
}: {
  params: { sizeId: string; storeId: string };
}) {
  const size = await getSizeById(params.sizeId);
  console.log(size);

  return (
    <div>
      <SizesForm initialData={size} />
    </div>
  );
}
