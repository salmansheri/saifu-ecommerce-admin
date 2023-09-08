import { prisma } from "../db";

export async function getOrderByStoreId(storeId: string) {
  const orders = await prisma.order.findMany({
    where: {
      storeId,
    },
    include: {
      store: true,
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  return orders;
}
export async function getOrderById(id: string) {
  const order = await prisma.order.findUnique({
    where: {
      id,
    },
  });

  return order;
}
