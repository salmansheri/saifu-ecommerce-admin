import * as z from "zod";

export const SignUpValidation = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  email: z.string().email({ message: "Enter Valid Email Address" }),
  password: z
    .string()
    .min(3, { message: "password must be at least 3 characters" }),
  imageUrl: z.string().optional(),
});
export const SignInValidation = z.object({
  email: z.string().email({ message: "Enter Valid Email Address" }),
  password: z
    .string()
    .min(3, { message: "password must be at least 3 characters" }),
});

export type SignInType = z.infer<typeof SignInValidation>;
export type SignUpType = z.infer<typeof SignUpValidation>;
