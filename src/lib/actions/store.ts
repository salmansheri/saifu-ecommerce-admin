import { prisma } from "../db";

export async function getUserStore(userId: string) {
  const stores = await prisma.store.findFirst({
    where: {
      userId,
    },
  });

  return stores;
}

export async function getStoresByUserId(userId: string) {
  const stores = await prisma.store.findMany({
    where: {
      userId,
    },
  });

  return stores;
}

export async function getStoreById(id: string) {
  const store = await prisma.store.findUnique({
    where: {
      id,
    },
  });

  if (!store) {
    return null;
  }

  return store;
}
