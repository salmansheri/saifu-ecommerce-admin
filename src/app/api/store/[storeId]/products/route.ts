import { getCurrentUser } from "@/lib/actions/user";
import { prisma } from "@/lib/db";
import { ProductValidation } from "@/lib/validations/products";
import * as z from "zod";

export async function GET(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new Response("Unauthenticated", {
        status: 401,
      });
    }

    const products = await prisma.product.findMany();

    return new Response(JSON.stringify(products), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function POST(
  request: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new Response("Unathorized", {
        status: 401,
      });
    }
    const body = await request.json();

    const {
      categoryId,
      colorId,
      images,
      name,
      price,
      sizeId,
      isArchieved,
      isFeatured,
    } = ProductValidation.parse(body);

    const product = await prisma.product.create({
      data: {
        name,
        colorId,
        categoryId,
        price,
        sizeId,
        storeId: params.storeId,
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
        isFeatured,
        isArchieved,
      },
    });

    return new Response(JSON.stringify(product));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Not Allowed", {
        status: 422,
      });
    }

    return new Response("Internal Server Error", {
      status: 500,
    });
  }
}
