import { getCurrentUser } from "@/lib/actions/user";
import { prisma } from "@/lib/db";
import { ProductValidation } from "@/lib/validations/products";
import * as z from "zod";

export async function GET(
  request: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const store = await prisma.product.findUnique({
      where: {
        id: params.productId,
      },
      include: {
        images: true,
        category: true,
        color: true,
        gender: true,
        orderItems: true,
        size: true,
        store: true,
      },
    });

    return new Response(JSON.stringify(store), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { storeId: string; productId: string } }
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
      name,
      categoryId,
      colorId,
      images,
      price,
      sizeId,
      isArchieved,
      isFeatured,
    } = ProductValidation.parse(body);

    if (!name) {
      return new Response("Invalid data", {
        status: 400,
      });
    }

    await prisma.product.update({
      where: {
        id: params.productId,
      },
      data: {
        name,
        categoryId,
        colorId,
        images: {
          deleteMany: {},
        },

        price,
        sizeId,
        isArchieved,
        isFeatured,
      },
    });

    const product = await prisma.product.update({
      where: {
        id: params.productId,
      },
      data: {
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
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
export async function DELETE(
  request: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new Response("Unathorized", {
        status: 401,
      });
    }

    const product = await prisma.product.delete({
      where: {
        id: params.productId,
      },
    });

    return new Response(JSON.stringify(product), {
      status: 200,
    });
  } catch (error) {
    console.log(error);

    return new Response("Internal Server Error", {
      status: 500,
    });
  }
}
