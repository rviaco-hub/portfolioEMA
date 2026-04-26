import { connectDB } from "./config/db";
import { app } from "./app";
import { env } from "./config/env";
// import { seedProduct } from "./modules/products/product.seed";

(async () => {
  await connectDB();

  // await seedProduct(); // ❌ Comentado temporalmente

  app.listen(env.PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${env.PORT}`);
  });
})();