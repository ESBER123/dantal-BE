import { z } from "zod";

export const registerSchema = z.object({
  body: z.object({
    age: z.number().min(18).optional(),
    first_name: z.string(),
    last_name: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(8),
  }),
});
