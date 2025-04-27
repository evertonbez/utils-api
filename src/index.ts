import { OpenAPIHono } from "@hono/zod-openapi";
import { Scalar } from "@scalar/hono-api-reference";
import { requestId } from "hono/request-id";
import type { Bindings } from "./common/bindings";
import {
  authMiddleware,
  loggingMiddleware,
  securityMiddleware,
} from "./middlewares";
import { openApiSpec } from "./openapi";
import aiRoutes from "./routes/ai";
import healthRoutes from "./routes/health";

const app = new OpenAPIHono<{ Bindings: Bindings }>({
  defaultHook: (result, c) => {
    if (!result.success) {
      return c.json({ success: false, errors: result.error.errors }, 422);
    }
  },
});

app.use("*", requestId());
app.use(authMiddleware);
app.use(securityMiddleware);
app.use(loggingMiddleware);

app.openAPIRegistry.registerComponent("securitySchemes", "Bearer", {
  type: "http",
  scheme: "bearer",
});

app.route("/health", healthRoutes).route("/ai", aiRoutes);

const generatedDoc = app.getOpenAPIDocument(openApiSpec);

app.doc("/openapi", openApiSpec);

app.get("/", Scalar({ url: "/openapi" }));

export const openAPIDocument = generatedDoc;

export type AppType = typeof app;

export default app;
