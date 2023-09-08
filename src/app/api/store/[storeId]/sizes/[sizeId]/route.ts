import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/actions/user";
import * as z from "zod";
import { StoreValidation } from "@/lib/validations/store";
import { CategoryColumn } from "@/app/(root)/(routes)/store/[storeId]/categories/[categoriesId]/components/column";
import { CategoryValidation } from "@/lib/validations/category";
import { ColorValidation } from "@/lib/validations/colors";
import { SizesValidation } from "@/lib/validations/sizes";

export async function GET(
  request: Request,
  { params }: { params: { storeId: string; sizeId: string } }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new Response("Unauthenticated", {
        status: 401,
      });
    }

    const size = await prisma.size.findUnique({
      where: {
        id: params.sizeId,
      },
    });

    return new Response(JSON.stringify(size), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { storeId: string; sizeId: string } }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new Response("Unathorized", {
        status: 401,
      });
    }
    const body = await request.json();

    const { name, value } = SizesValidation.parse(body);

    const size = await prisma.size.update({
      where: {
        id: params.sizeId,
      },
      data: {
        name,
        value,
      },
    });

    return new Response(JSON.stringify(size));
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
  { params }: { params: { storeId: string; sizeId: string } }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new Response("Unathorized", {
        status: 401,
      });
    }

    const size = await prisma.size.delete({
      where: {
        id: params.sizeId,
      },
    });

    return new Response(JSON.stringify(size), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    console.log(params.sizeId);

    return new Response("Internal Server Error", {
      status: 500,
    });
  }
}
