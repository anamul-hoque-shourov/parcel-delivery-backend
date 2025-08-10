import express from "express";
import { createPaymentIntent } from "../controllers/paymentController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create-payment-intent", authMiddleware, createPaymentIntent);

export default router;
