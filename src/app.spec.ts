import { expect, test } from "vitest";
import { makeApp } from "./app";

test("GET / returns {ok:true}", async () => {
  const app = makeApp();

  const response = await app.inject({
    path: "/",
  });

  await expect(JSON.parse(response.body)).toEqual({ ok: true });
});
