import { z } from "zod";

export const serviceSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    description: z.string().optional(),
    price: z.number(),
    duration: z.number(),
  }),
});
