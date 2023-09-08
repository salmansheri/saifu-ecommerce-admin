import { z } from "zod";

export const SizesValidation = z.object({
  name: z.string(),
  value: z.string(),
  storeId: z.string().optional(),
});

export type SizesType = z.infer<typeof SizesValidation>;
