import { prisma } from "../db";

export async function getCategoriesByStoreId(storeId: string) {
  const categories = await prisma.category.findMany({
    where: {
      storeId,
    },
    include: {
      billboard: true,
    },
  });

  return categories;
}
export async function getCategoryById(id: string) {
  const categories = await prisma.category.findUnique({
    where: {
      id,
    },
  });

  return categories;
}
