import { RouteShorthandOptions } from "fastify";
import { makeApp } from "../app";
import { createRedirection, findRedirection } from "../models/redirections";
import { Services } from "../services";

export function injectRedirectionsController(
  app: ReturnType<typeof makeApp>,
  services: Services
) {
  app.get("/:slug", async (request, response) => {
    const { slug } = request.params as { slug: string };
    const redirection = await findRedirection(services, { slug });
    if (!redirection) {
      response.status(404).send({ error: "Slug matches no URL" });
      return;
    }

    response.redirect(redirection.url);
  });

  app.post("/redirections", async (request, response) => {
    const { slug, url } = request.body as { slug: string; url: string };
    const redirection = await createRedirection(services, { url, slug });
    response.send(redirection);
  });
}
