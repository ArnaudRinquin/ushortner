import { Services } from "../services";

export interface Redirection {
  url: string;
  slug: string;
}

export async function createRedirection(
  services: Services,
  {
    url,
    slug,
  }: {
    url: string;
    slug: string;
  }
) {
  const [redirection] = await services.db<Redirection>("redirections").insert(
    {
      slug,
      url,
    },
    "*"
  );

  return redirection;
}

export async function findRedirection(
  services: Services,
  {
    slug,
  }: {
    slug: string;
  }
) {
  const redirection = await services
    .db<Redirection>("redirections")
    .select("*")
    .where({ slug })
    .first();

  return redirection;
}
