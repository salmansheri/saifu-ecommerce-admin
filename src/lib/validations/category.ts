import { z } from "zod";

export const CategoryValidation = z.object({
  name: z.string(),
  billboardId: z.string(),
});

export type CategoryType = z.infer<typeof CategoryValidation>;
