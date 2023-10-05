import { getCurrentUser } from "@/lib/actions/user";
import { prisma } from "@/lib/db";
import { BillboardValidation } from "@/lib/validations/billboard";
import { NextResponse } from "next/server";
import * as z from "zod";

export async function GET(
  request: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) {
  try {
    const billboard = await prisma.billboard.findUnique({
      where: {
        id: params.billboardId,
      },
    });

    return NextResponse.json(billboard, {
      status: 200,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function PATCH(
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
    const body = await request.json();

    const { imageUrl, label } = BillboardValidation.parse(body);

    const billboard = await prisma.billboard.update({
      where: {
        id: params.billboardId,
      },
      data: {
        imageUrl,
        label,
      },
    });

    return new Response(JSON.stringify(billboard));
  } catch (error) {
    console.log(error);
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
