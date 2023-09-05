import { expect, test } from "vitest";
import { makeApp } from "./app";
import { makeTestServices } from "./test/helpers";

test("GET / returns {ok:true}", async () => {
  const app = makeApp(makeTestServices());

  const response = await app.inject({
    path: "/",
  });

  await expect(JSON.parse(response.body)).toEqual({ ok: true });
});
