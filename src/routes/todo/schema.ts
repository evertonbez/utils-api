import { z } from "zod";

export const ListTodosSchema = z.object({
  data: z.array(
    z.object({
      title: z.string(),
      completed: z.boolean(),
    })
  ),
});
