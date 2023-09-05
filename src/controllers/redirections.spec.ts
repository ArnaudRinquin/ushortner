import { expect, describe, it } from "vitest";
import { makeTestServices } from "../test/helpers";
import { injectRedirectionsController } from "./redirections";
import Fastify, { FastifyInstance } from "fastify";
import { createRedirection } from "../models/redirections";
import { Services } from "../services";

async function createSingleRedirection(services: Services) {
  await services.db.table("redirections").truncate();
  const attrs = { url: "http://lolcat.host:1234", slug: "lolcathost" };
  return await createRedirection(services, attrs);
}
describe("GET /:slug", async () => {
  it("returns 404 when slug does not match", async () => {
    const app: FastifyInstance = Fastify({});
    const services = makeTestServices();

    injectRedirectionsController(app, services);

    const response = await app.inject({
      path: `/no-match`,
    });

    await expect(response.statusCode).toEqual(404);
  });

  it("redirects to redirection url when slug matches", async () => {
    const app: FastifyInstance = Fastify({});
    const services = makeTestServices();

    injectRedirectionsController(app, services);

    const redirection = await createSingleRedirection(services);

    const response = await app.inject({
      path: `/${redirection.slug}`,
    });

    await expect(response.headers["location"]).toEqual(redirection.url);
  });
});

describe("POST /redirections", async () => {
  it("creates a redirection and returns it", async () => {
    const app: FastifyInstance = Fastify({});
    const services = makeTestServices();

    injectRedirectionsController(app, services);

    const attrs = {
      slug: "new-lolcathost",
      url: "https://developer.mozilla.org/",
    };

    await services.db.table("redirections").truncate();
    const response = await app.inject({
      path: `/redirections`,
      method: "POST",
      body: attrs,
    });

    expect(response.statusCode).toEqual(200);
    expect(JSON.parse(response.body)).toEqual(attrs);
  });
});
