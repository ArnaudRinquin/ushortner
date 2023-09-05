import { expect, it, describe } from "vitest";
import { makeDB } from "../services/db";
import { createRedirection, findRedirection } from "./redirections";

describe("createRedirection", () => {
  it("Creates and returns the redirection", async () => {
    const db = makeDB();
    await db.table("redirections").truncate();
    const redirection = await createRedirection(
      { db },
      { url: "http://lolcat.host:1234", slug: "lolcathost" }
    );
    expect(redirection).toBeDefined();

    const allRedirections = await db.table("redirections").select("*");
    expect(allRedirections).toEqual([
      { url: "http://lolcat.host:1234", slug: "lolcathost" },
    ]);
  });
});

describe("findRedirection", () => {
  it("returns the redirection for given slug", async () => {
    const db = makeDB();
    await db.table("redirections").truncate();
    const attrs = { url: "http://lolcat.host:1234", slug: "lolcathost" };
    await createRedirection({ db }, attrs);

    const redirection = await findRedirection({ db }, { slug: "lolcathost" });
    expect(redirection).toEqual(attrs);
  });
});
