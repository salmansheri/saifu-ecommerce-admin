import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/actions/user";
import * as z from "zod";
import { StoreValidation } from "@/lib/validations/store";
import { BillboardValidation } from "@/lib/validations/billboard";

export async function GET(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new Response("Unauthenticated", {
        status: 401,
      });
    }

    const billboards = await prisma.store.findMany();

    return new Response(JSON.stringify(billboards), {
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

    const { imageUrl, label } = BillboardValidation.parse(body);

    if (!imageUrl) {
      return new Response("Image url is Required", {
        status: 400,
      });
    }
    if (!label) {
      return new Response("label is Required", {
        status: 400,
      });
    }

    const store = await prisma.billboard.create({
      data: {
        imageUrl,
        label,
        storeId: params.storeId,
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
