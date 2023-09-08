import { z } from "zod";

export const BillboardValidation = z.object({
  label: z.string().min(3),
  imageUrl: z.string(),
});

export type BillboardType = z.infer<typeof BillboardValidation>;
