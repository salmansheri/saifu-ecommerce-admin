import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/actions/user";
import * as z from "zod";
import { StoreValidation } from "@/lib/validations/store";
import { ProductValidation } from "@/lib/validations/products";

export async function GET(
  request: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new Response("Unauthenticated", {
        status: 401,
      });
    }

    const store = await prisma.store.findUnique({
      where: {
        id: params.storeId,
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

    const product = await prisma.product.update({
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
    console.log(params.productId);

    return new Response("Internal Server Error", {
      status: 500,
    });
  }
}
