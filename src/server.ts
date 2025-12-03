import mongoose from "mongoose";
import { app } from "./app";
import { envVars } from "./app/config/env";

// import { connectRedis } from "./app/config/redis.config";

const startServer = async () => {
  try {
    await mongoose.connect(envVars.DB_URL);
    console.log("🍃 Connected to mongoose");

    app.listen(envVars.PORT, () => {
      console.log(`🔐 authify server is connected and  is running on port ${envVars.PORT}`);
    });
  } catch (error) {
    console.log("Error connecting mongoose", error);
  }
};

(async () => {
  await startServer();
})();
