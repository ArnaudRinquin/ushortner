import Fastify, { FastifyInstance, RouteShorthandOptions } from "fastify";
import { injectRedirectionsController } from "./controllers/redirections";
import { Services } from "./services";

export function makeApp(services: Services) {
  const app: FastifyInstance = Fastify({});

  const opts: RouteShorthandOptions = {
    schema: {
      response: {
        200: {
          type: "object",
          properties: {
            ok: {
              type: "boolean",
            },
          },
        },
      },
    },
  };

  app.get("/", opts, async (request, reply) => {
    return { ok: true };
  });

  injectRedirectionsController(app, services);

  return app;
}
