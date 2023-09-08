import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/actions/user";
import * as z from "zod";
import { StoreValidation } from "@/lib/validations/store";

export async function GET(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new Response("Unauthenticated", {
        status: 401,
      });
    }

    const stores = await prisma.store.findMany();

    return new Response(JSON.stringify(stores), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function POST(request: Request) {
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

    const store = await prisma.store.create({
      data: {
        name,
        userId: currentUser.id!,
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
