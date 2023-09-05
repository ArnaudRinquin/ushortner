import { makeApp } from "./app";

const start = async () => {
  const app = makeApp();
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
