import Navbar from "@/components/ui/navigation/navbar";
import {
  getStoreById,
  getStoresByUserId,
  getUserStore,
} from "@/lib/actions/store";
import { getCurrentUser } from "@/lib/actions/user";
import { prisma } from "@/lib/db";
import { Store } from "@prisma/client";

export default async function StoreLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const currentUser = await getCurrentUser();
  const stores = await prisma.store.findMany();
  const store = await prisma.store.findFirst();
  return (
    <div>
      {/* @ts-ignore  */}
      <Navbar data={stores} store={store} currentUser={currentUser} />
      {children}
    </div>
  );
}
