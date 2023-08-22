import { prisma } from "@/lib/db";
import { SignUpValidation } from "@/lib/validations/user";
import bcrypt from "bcrypt";
import * as z from "zod";

export async function GET(request: Request) {
  try {
    const user = await prisma.user.findMany();

    return new Response(JSON.stringify(user), {
      status: 200,
    });
  } catch (error) {
    return new Response("Internal Server Error", {
      status: 500,
    });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { email, name, password, imageUrl } = SignUpValidation.parse(body);

    if (!email || !name || !password) {
      return new Response("Invalid details", {
        status: 400,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
        image: imageUrl,
      },
    });

    return new Response(JSON.stringify(user), {
      status: 200,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Not Allowed", { status: 422 });
    }
    return new Response("Internal server Error", {
      status: 500,
    });
  }
}
