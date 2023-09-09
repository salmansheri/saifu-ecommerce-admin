import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/actions/user";
import * as z from "zod";
import { StoreValidation } from "@/lib/validations/store";
import { CategoryValidation } from "@/lib/validations/category";

export async function GET(request: Request) {
  try {
    const categories = await prisma.category.findMany();

    return new Response(JSON.stringify(categories), {
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

    const { billboardId, name } = CategoryValidation.parse(body);

    if (!billboardId) {
      return new Response("billboardId is Required", {
        status: 400,
      });
    }
    if (!name) {
      return new Response("name is Required", {
        status: 400,
      });
    }

    const category = await prisma.category.create({
      data: {
        billboardId,
        name,
        storeId: params.storeId,
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
