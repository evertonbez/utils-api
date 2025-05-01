import type { Bindings } from "@/common/bindings";
import { ErrorSchema } from "@/common/schema";
import { arrayBufferToBase64 } from "@/utils/buffer";
import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { AudioUploadResponseSchema } from "./schema";

const app = new OpenAPIHono<{ Bindings: Bindings }>().openapi(
  createRoute({
    method: "post",
    path: "/transcribe",
    summary: "Transcribe audio",
    tags: ["ai"],
    request: {
      body: {
        content: {
          "multipart/form-data": {
            schema: z.object({
              file: z.instanceof(File).openapi({
                description: "Audio file",
                type: "string",
                format: "binary",
              }),
              initial_prompt: z.string().optional().openapi({
                description: "Initial prompt",
                type: "string",
              }),
              language: z.string().optional().openapi({
                description: "Language",
                type: "string",
              }),
              prefix: z.string().optional().openapi({
                description: "Prefix",
                type: "string",
              }),
            }),
          },
        },
      },
    },
    responses: {
      200: {
        content: {
          "application/json": {
            schema: AudioUploadResponseSchema,
          },
        },
        description: "Retrieve all todos",
      },
      400: {
        content: {
          "application/json": {
            schema: ErrorSchema,
          },
        },
        description: "Returns an error",
      },
    },
  }),
  async (c) => {
    const body = await c.req.parseBody();
    const file = body.file as File;

    const initialPrompt = body.initial_prompt as string | undefined;
    const prefix = body.prefix as string | undefined;
    const language = body.language as string | undefined;

    const buffer = await file.arrayBuffer();
    const base64Audio = arrayBufferToBase64(buffer);

    const result = await c.env.AI.run("@cf/openai/whisper-large-v3-turbo", {
      audio: base64Audio,
      language,
      initial_prompt: initialPrompt,
      prefix,
    });

    return c.json({ text: result.text }, 200);
  }
);

export default app;
