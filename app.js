// app.js
import express from "express";
import cors from "cors";
import parcelRoutes from "./src/routes/parcelRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import riderRoutes from "./src/routes/riderRoutes.js";
import merchantRoutes from "./src/routes/merchantRoutes.js";
import paymentRoutes from "./src/routes/paymentRoutes.js";

const app = express();

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());

// Routes
app.use("/api/parcels", parcelRoutes);
app.use("/api/users", userRoutes);
app.use("/api/riders", riderRoutes);
app.use("/api/merchants", merchantRoutes);
app.use("/api/payments", paymentRoutes);

export default app;
