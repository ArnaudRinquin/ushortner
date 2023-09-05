import { Services } from "../services";
import { makeDB } from "../services/db";

export function makeTestServices(): Services {
  return {
    db: makeDB(),
  };
}
