import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/actions/user";
import * as z from "zod";
import { StoreValidation } from "@/lib/validations/store";
import { CategoryValidation } from "@/lib/validations/category";
import { ColorValidation } from "@/lib/validations/colors";

export async function GET(request: Request) {
  try {
    const colors = await prisma.color.findMany();

    return new Response(JSON.stringify(colors), {
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

    const { value, name } = ColorValidation.parse(body);

    if (!value) {
      return new Response("value is Required", {
        status: 400,
      });
    }
    if (!name) {
      return new Response("name is Required", {
        status: 400,
      });
    }

    const color = await prisma.color.create({
      data: {
        value,

        name,
        storeId: params.storeId,
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
