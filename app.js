// app.js
import express from "express";
import cors from "cors";
import parcelRoutes from "./src/routes/parcelRoutes.js";
import { logger } from "./src/utils/logger.js";
import { requestLogger } from "./src/middlewares/requestLogger.js";

const app = express();

// Middleware
app.use(
  cors({
    origin: "*", // allow requests from all origins
    methods: ["GET", "POST", "PUT", "DELETE"], // allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // allowed headers
  })
);
app.use(express.json());
app.use(requestLogger);

// app.use(logger);
// Routes
app.use("/parcels", parcelRoutes);

export default app;
