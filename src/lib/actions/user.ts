import { prisma } from "../db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return null;
  }

  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  return {
    id: currentUser?.id,
    name: currentUser?.name,
    email: currentUser?.email,
    image: currentUser?.image,
  };
}
