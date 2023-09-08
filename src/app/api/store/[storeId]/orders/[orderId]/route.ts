import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/actions/user";
import * as z from "zod";
import { StoreValidation } from "@/lib/validations/store";

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

    const { name } = StoreValidation.parse(body);

    if (!name) {
      return new Response("Invalid data", {
        status: 400,
      });
    }

    const store = await prisma.store.update({
      where: {
        id: params.storeId,
      },
      data: {
        name,
      },
    });

    return new Response(JSON.stringify(store));
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
  { params }: { params: { storeId: string; billboardId: string } }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new Response("Unathorized", {
        status: 401,
      });
    }

    const billboard = await prisma.billboard.delete({
      where: {
        id: params.billboardId,
      },
    });

    return new Response(JSON.stringify(billboard), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    console.log(params.billboardId);

    return new Response("Internal Server Error", {
      status: 500,
    });
  }
}
