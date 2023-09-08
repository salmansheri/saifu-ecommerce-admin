import * as z from "zod";

export const StoreValidation = z.object({
  name: z
    .string()
    .min(3, { message: "Store name must have at least 3 characters" }),
});

export type StoreType = z.infer<typeof StoreValidation>;
