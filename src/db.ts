import knex from "knex";

export function makeDB() {
  return knex({
    client: "pg",
    connection: {
      host: "127.0.0.1",
      port: 5432,
      user: "postgres",
      password: "example",
      database: "postgres",
    },
  });
}
