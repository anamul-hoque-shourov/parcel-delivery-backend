import express from "express";
import cors from "cors";
import { config } from "dotenv";
import dbConnection from "./database/db.js";
import parcelRoutes from "./routes/parcelRoutes.js";
import userRoutes from "./routes/userRoutes.js";

config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

// Routes
app.use("/api/parcels", parcelRoutes);
app.use("/api/users", userRoutes);

// Database connection and server start
const startServer = async () => {
  try {
    await dbConnection();
    app.listen(port, () => {
      console.log(
        `Server is running on port ${port} in ${process.env.ENVIRONMENT} environment.`
      );
    });
  } catch (err) {
    console.error("Failed to connect to database:", err);
    process.exit(1);
  }
};

startServer();
