import type { Bindings } from "@/common/bindings";
import { ErrorSchema } from "@/common/schema";
import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { ListTodosSchema } from "./schema";

const app = new OpenAPIHono<{ Bindings: Bindings }>().openapi(
  createRoute({
    method: "get",
    path: "/",
    summary: "List Todos",
    responses: {
      200: {
        content: {
          "application/json": {
            schema: ListTodosSchema,
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
    return c.json(
      {
        data: [
          {
            title: "Todo One",
            completed: false,
          },
        ],
      },
      200
    );
  }
);

export default app;
