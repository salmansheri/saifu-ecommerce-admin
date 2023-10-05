import { getUserStore } from "@/lib/actions/store";
import { getCurrentUser } from "@/lib/actions/user";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function Home() {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return null;
  }

  const store = await prisma.store.findFirst();

  if (store) {
    redirect(`/store/${store.id}/update`);
  } else {
    redirect("/store/new");
  }

  return <div>Home</div>;
}
