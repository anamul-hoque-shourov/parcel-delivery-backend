import express from "express";
import cors from "cors";
import { config } from "dotenv";
import dbConnection from "./database/db.js";
import parcelRoutes from "./routes/parcelRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import riderRoutes from "./routes/riderRoutes.js";
import merchantRoutes from "./routes/merchantRoutes.js";

config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

// Routes
app.use("/api/parcels", parcelRoutes);
app.use("/api/users", userRoutes);
app.use("/api/riders", riderRoutes);
app.use("/api/merchants", merchantRoutes);

// Database connection and server start
const startServer = async () => {
  try {
    await dbConnection();
    app.listen(port, () => {
      console.log(
        `Server is running on port ${port} in ${process.env.ENVIRONMENT} environment.`
      );
    });
  } catch (error) {
    console.error("Failed to connect to database:", error);
    process.exit(1);
  }
};

startServer();
