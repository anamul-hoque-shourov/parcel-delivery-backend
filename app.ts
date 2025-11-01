import express, { Application } from "express";
import cors from "cors";
import requestLogger from "@/api/middlewares/request_logger";
import parcelRoutes from "@/api/routes/parcelRoutes";
import userRoutes from "@/api/routes/user_routes";

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
