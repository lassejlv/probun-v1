import { z } from 'zod';

export const Options = z.object({
  port: z.number(),
  routes: z.string(),
  onReady: z
    .function(
      z.tuple([
        z.object({
          port: z.number(),
        }),
      ])
    )
    .optional(),
  middlewares: z.any(),
});
