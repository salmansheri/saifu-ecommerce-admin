import { getUserStore } from "@/lib/actions/store";
import { getCurrentUser } from "@/lib/actions/user";
import { redirect } from "next/navigation";

export default async function Home() {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return null;
  }

  const store = await getUserStore(currentUser.id as string);

  if (store) {
    redirect(`/store/${store.id}/update`);
  } else {
    redirect("/store/new");
  }

  return <div>Home</div>;
}
