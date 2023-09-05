import { expect, test } from "vitest";
import { makeDB } from "./db";

test("Connection to DB", async () => {
  const db = makeDB();
  const result = await db.raw("SELECT 1 as OK");
  await expect(result.rows[0]).toEqual(expect.objectContaining({ ok: 1 }));
});
