import { prisma } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    let category = searchParams.get("category");
    let size = searchParams.get("size");
    let color = searchParams.get("color");

    // console.log(category);
    // console.log(size);
    console.log(category);

    const products = await prisma.product.findMany({
      where: {
        OR: [
          {
            category: {
              name: {
                contains: category as string,
                mode: "insensitive",
              },
            },
          },
          {
            color: {
              name: {
                contains: color as string,
                mode: "insensitive",
              },
            },
          },
          {
            size: {
              name: {
                contains: size as string,
                mode: "insensitive",
              },
            },
          },
        ],
      },
    });

    return new Response(JSON.stringify(products), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
  }
}
