import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/actions/user";
import * as z from "zod";
import { StoreValidation } from "@/lib/validations/store";
import { CategoryColumn } from "@/app/(root)/(routes)/store/[storeId]/categories/[categoriesId]/components/column";
import { CategoryValidation } from "@/lib/validations/category";

export async function GET(
  request: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new Response("Unauthenticated", {
        status: 401,
      });
    }

    const category = await prisma.category.findUnique({
      where: {
        id: params.storeId,
      },
    });

    return new Response(JSON.stringify(category), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { storeId: string; categoryId: string } }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new Response("Unathorized", {
        status: 401,
      });
    }
    const body = await request.json();

    const { name, billboardId } = CategoryValidation.parse(body);

    const category = await prisma.category.update({
      where: {
        id: params.categoryId,
      },
      data: {
        name,
        billboardId,
      },
    });

    return new Response(JSON.stringify(category));
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
  { params }: { params: { storeId: string; categoryId: string } }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new Response("Unathorized", {
        status: 401,
      });
    }

    const category = await prisma.category.delete({
      where: {
        id: params.categoryId,
      },
    });

    return new Response(JSON.stringify(category), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    console.log(params.categoryId);

    return new Response("Internal Server Error", {
      status: 500,
    });
  }
}
