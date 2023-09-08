import { prisma } from "../db";

export async function getSizesByStoreId(storeId: string) {
  const sizes = await prisma.size.findMany({
    where: {
      storeId,
    },
    include: {
      store: true,
    },
  });

  return sizes;
}
export async function getSizeById(id: string) {
  const size = await prisma.size.findUnique({
    where: {
      id,
    },
  });

  return size;
}
