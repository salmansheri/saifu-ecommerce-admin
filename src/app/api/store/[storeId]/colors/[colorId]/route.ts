import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/actions/user";
import * as z from "zod";
import { StoreValidation } from "@/lib/validations/store";
import { CategoryColumn } from "@/app/(root)/(routes)/store/[storeId]/categories/[categoriesId]/components/column";
import { CategoryValidation } from "@/lib/validations/category";
import { ColorValidation } from "@/lib/validations/colors";

export async function GET(
  request: Request,
  { params }: { params: { storeId: string; colorId: string } }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new Response("Unauthenticated", {
        status: 401,
      });
    }

    const color = await prisma.color.findUnique({
      where: {
        id: params.colorId,
      },
    });

    return new Response(JSON.stringify(color), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { storeId: string; colorId: string } }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new Response("Unathorized", {
        status: 401,
      });
    }
    const body = await request.json();

    const { name, value } = ColorValidation.parse(body);

    const color = await prisma.color.update({
      where: {
        id: params.colorId,
      },
      data: {
        name,
        value,
      },
    });

    return new Response(JSON.stringify(color));
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
  { params }: { params: { storeId: string; colorId: string } }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new Response("Unathorized", {
        status: 401,
      });
    }

    const color = await prisma.color.delete({
      where: {
        id: params.colorId,
      },
    });

    return new Response(JSON.stringify(color), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    console.log(params.colorId);

    return new Response("Internal Server Error", {
      status: 500,
    });
  }
}
