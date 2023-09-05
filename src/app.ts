import Fastify, { FastifyInstance, RouteShorthandOptions } from "fastify";

export function makeApp() {
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

  return app;
}
