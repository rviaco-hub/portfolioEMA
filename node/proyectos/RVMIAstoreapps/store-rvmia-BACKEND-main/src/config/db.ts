import mongoose from "mongoose";
import { env } from "./env";

export const connectDB = async (): Promise<void> => {
  try {
    console.log("Conectando Atlas...");
    console.log("URI cargada:", !!env.mongoUri);

    await mongoose.connect(env.mongoUri);

    console.log("MongoDB Atlas conectado");
  } catch (error) {
    console.error("Error MongoDB:", error);
    process.exit(1);
  }
};