import express, { Application } from "express";
import cors from "cors";
import requestLogger from "@/middlewares/requestLogger";
import parcelRoutes from "@/routes/parcelRoutes";
import userRoutes from "@/routes/userRoutes";

const app: Application = express();

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
