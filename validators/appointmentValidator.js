import { z } from "zod";

export const appointmentSchema = z.object({
  body: z.object({
    patientName: z.string().min(2),
    patientPhone: z.string().min(8),
    patientEmail: z.string().email().optional(),
    date: z.string(),
    notes: z.string().optional(),
    doctorId: z.number(),
    serviceId: z.number(),
  }),
});
