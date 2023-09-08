import { z } from "zod";

export const ColorValidation = z.object({
  name: z.string(),
  value: z.string(),
  storeId: z.string().optional(),
});

export type ColorType = z.infer<typeof ColorValidation>;
