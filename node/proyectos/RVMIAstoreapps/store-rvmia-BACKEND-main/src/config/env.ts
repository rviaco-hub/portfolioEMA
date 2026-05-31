import dotenv from "dotenv";
import path from "path";

const envPath = path.resolve(process.cwd(), ".env");

console.log("Leyendo .env desde:", envPath);

dotenv.config({
  path: envPath,
});

console.log("MONGO_URI cargado:", !!process.env.MONGO_URI);

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI no está definido");
}

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET no está definido");
}

export const env = {
  port: Number(process.env.PORT) || 5000,

  mongoUri: process.env.MONGO_URI || "",

  jwtSecret: process.env.JWT_SECRET || "",

  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || "",

  frontendUrl: process.env.FRONTEND_URL || "",

  wompiPublicKey: process.env.WOMPI_PUBLIC_KEY || "",

  wompiPrivateKey: process.env.WOMPI_PRIVATE_KEY || "",

  wompiEventsSecret: process.env.WOMPI_EVENTS_SECRET || "",
};