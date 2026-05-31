import { env } from "./config/env";
import app from "./app";
import { connectDB } from "./config/db";

const startServer = async (): Promise<void> => {
  try {
    console.log("ENV Mongo:", env.mongoUri ? "OK" : "VACÍO");

    await connectDB();

    app.listen(env.port, () => {
      console.log(`SV1. Servidor en puerto ${env.port}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

startServer();