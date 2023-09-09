import { getCurrentUser } from "@/lib/actions/user";
import { prisma } from "@/lib/db";
import { SizesValidation } from "@/lib/validations/sizes";
import * as z from "zod";

export async function GET(request: Request) {
  try {
    const sizes = await prisma.size.findMany();

    return new Response(JSON.stringify(sizes), {
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

    const { value, name } = SizesValidation.parse(body);

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

    const size = await prisma.size.create({
      data: {
        value,

        name,
        storeId: params.storeId,
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
