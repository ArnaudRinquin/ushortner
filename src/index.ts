import Fastify, { FastifyInstance, RouteShorthandOptions } from "fastify";
import { Server, IncomingMessage, ServerResponse } from "http";

const server: FastifyInstance = Fastify({});

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

server.get("/", opts, async (request, reply) => {
  return { ok: true };
});

const start = async () => {
  try {
    await server.listen({ port: 3000 });

    const address = server.server.address();
    const port = typeof address === "string" ? address : address?.port;
    console.log(`Listening on port: ${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
