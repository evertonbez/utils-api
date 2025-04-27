import type { Bindings } from "@/common/bindings";
import { ErrorSchema } from "@/common/schema";
import { Provider } from "@/providers";
import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { env } from "hono/adapter";
import { HealthSchema } from "./schema";

const app = new OpenAPIHono<{ Bindings: Bindings }>().openapi(
  createRoute({
    method: "get",
    path: "/",
    summary: "Health",
    responses: {
      200: {
        content: {
          "application/json": {
            schema: HealthSchema,
          },
        },
        description: "Retrieve health",
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
    const envs: any = env(c);

    const api = new Provider();

    const whatsapp = new Provider({
      envs,
      provider: "whatsapp",
    });

    const providers = await api.getHealthCheck({
      envs,
    });

    const allServices = { ...providers };

    const isHealthy = Object.values(allServices).every(
      (service) => service.healthy
    );

    if (isHealthy) {
      return c.json(
        {
          data: allServices,
        },
        200
      );
    }

    return c.json(
      {
        requestId: c.get("requestId"),
        message: "Service unhelthy",
        code: "bad_request",
      },
      400
    );
  }
);

export default app;
