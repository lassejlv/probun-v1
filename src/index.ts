import { z } from 'zod';
import { Options } from './zod';

// Export all buildin types and helpers
import type { Next, Params } from './types';
import { logger } from './helpers/logger';
import { Context, type ContextType, type Route } from './helpers/context';

const applyMiddlewares = async (
  req: Request,
  middlewares: Array<(req: Request, next: () => Promise<Response>) => Promise<Response>>,
  handler: () => Promise<Response>
) => {
  let index = -1;

  const next = async (): Promise<Response> => {
    index++;
    if (index < middlewares.length) {
      return middlewares[index](req, next);
    } else {
      return handler();
    }
  };

  return next();
};

const Probun = async (options: z.infer<typeof Options>) => {
  // Validate the options
  const data = Options.parse(options);

  // Create the server
  Bun.serve({
    port: data.port,
    fetch: async (req) => {
      const router = new Bun.FileSystemRouter({
        style: 'nextjs',
        dir: data.routes,
      });

      const url = new URL(req.url);
      const pathname = url.pathname;
      const method = req.method;

      const match = router.match(pathname);
      if (!match) {
        return new Response(JSON.stringify({ error: 'Route not found' }), { status: 404 });
      }

      const filePath = match.filePath;

      try {
        const module = await import(filePath);

        // Check for the respective method handler (GET, POST, etc.)
        // Funtion with the Route type
        let handler;
        switch (method) {
          case 'GET':
            handler = module.GET;
            break;
          case 'POST':
            handler = module.POST;
            break;
          case 'PUT':
            handler = module.PUT;
            break;
          case 'DELETE':
            handler = module.DELETE;
            break;
        }

        if (!handler) {
          return new Response(JSON.stringify({ error: 'Handler not found' }), { status: 404 });
        }

        // Apply middlewares and call the handler function
        return await applyMiddlewares(req, data.middlewares || [], () =>
          handler({
            json: Context(req).json,
            pretty: Context(req).pretty,
            text: Context(req).text,
            html: Context(req).html,
            error: Context(req).error,
            success: Context(req).success,
            redirect: Context(req).redirect,
            sendFile: Context(req).sendFile,
            readHtml: Context(req).readHtml,
            req,
            params: match.params,
          })
        );
      } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ error: 'Error loading handler' }), { status: 500 });
      }
    },
  });

  // Use user's onReady function
  if (data.onReady) {
    await data.onReady({ port: data.port });
  }
};

export { Probun, type Next, type Params, logger, Context, type ContextType, type Route };
