import { makeDB } from "./db";

export type Services = {
  db: ReturnType<typeof makeDB>;
};
