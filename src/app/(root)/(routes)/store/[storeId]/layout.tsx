import Navbar from "@/components/ui/navigation/navbar";
import {
  getStoreById,
  getStoresByUserId,
  getUserStore,
} from "@/lib/actions/store";
import { getCurrentUser } from "@/lib/actions/user";
import { Store } from "@prisma/client";

export default async function StoreLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const currentUser = await getCurrentUser();
  const stores = await getStoresByUserId(currentUser?.id as string);
  const store = await getStoreById(params.storeId);
  return (
    <div>
      <Navbar data={stores} store={store} />
      {children}
    </div>
  );
}
