import { makeApp } from "./app";
import { Services } from "./services";
import { makeDB } from "./services/db";

const start = async () => {
  const services: Services = {
    db: makeDB(),
  };
  const app = makeApp(services);
  try {
    await app.listen({ port: 3000 });

    const address = app.server.address();
    const port = typeof address === "string" ? address : address?.port;
    console.log(`Listening on port: ${port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
