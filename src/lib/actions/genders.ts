import { prisma } from "../db";

export async function getGenders() {
  const genders = await prisma.gender.findMany();

  return genders;
}
