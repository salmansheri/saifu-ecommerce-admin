import { prisma } from "../db";

export async function getProductsByStoreId(storeId: string) {
  const products = await prisma.product.findMany({
    where: {
      storeId,
    },
    include: {
      category: true,
      images: true,
      size: true,
      color: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return products;
}
