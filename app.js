import express from "express";
import cors from "cors";
import requestLogger from "./src/middlewares/requestLogger.js";
import parcelRoutes from "./src/routes/parcelRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(requestLogger);

app.use("/parcels", parcelRoutes);
app.use("/users", userRoutes);

export default app;
