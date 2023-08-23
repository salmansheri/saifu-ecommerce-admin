import StoreForm from "@/components/forms/store-form";
import { getStoreById } from "@/lib/actions/store";

export default async function UpdateStorePage({
  params,
}: {
  params: { storeId: string };
}) {
  const { storeId } = params;
  const store = await getStoreById(storeId);
  console.log(storeId);
  return (
    <div className="">
      {" "}
      <StoreForm initialData={store!} />
    </div>
  );
}
