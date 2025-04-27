import { z } from "zod";

export const HealthSchema = z.object({
  data: z.object({
    whatsapp: z.object({
      healthy: z.boolean(),
    }),
    instagram: z.object({
      healthy: z.boolean(),
    }),
  }),
});
