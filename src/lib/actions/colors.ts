import { prisma } from "../db";

export async function getColorsByStoreId(storeId: string) {
  const colors = await prisma.color.findMany({
    where: {
      storeId,
    },
    include: {
      store: true,
    },
  });

  return colors;
}
export async function getColorById(id: string) {
  const colors = await prisma.color.findUnique({
    where: {
      id,
    },
  });

  return colors;
}
