import { z } from "zod";

export const AudioUploadResponseSchema = z.object({
  text: z.string().openapi({ description: "Transcribed text" }),
});
