import { z } from "zod";
export const doctorSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    specialty: z.string().min(2),
    image: z.string().optional(),
    description: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().email().optional(),
    isAvailable: z.preprocess((value) => {
      if (value === "true") return true;
      if (value === "false") return false;
      return value;
    }, z.boolean().optional()),
  }),
});
