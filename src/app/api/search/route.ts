import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const searchQuery = searchParams.get("query");

    const products = await prisma.product.findMany({
      where: {
        OR: [
          {
            name: {
              contains: searchQuery as string,
              mode: "insensitive",
            },
          },
          {
            category: {
              name: {
                contains: searchQuery as string,
                mode: "insensitive",
              },
            },
          },
          {
            color: {
              name: {
                contains: searchQuery as string,
                mode: "insensitive",
              },
            },
          },
          {
            size: {
              value: {
                contains: searchQuery as string,
                mode: "insensitive",
              },
            },
          },
        ],
      },
      include: {
        category: true,
        color: true,
        size: true,
        gender: true,
        images: true,
      },
    });

    return NextResponse.json(products, {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", {
      status: 500,
    });
  }
}
