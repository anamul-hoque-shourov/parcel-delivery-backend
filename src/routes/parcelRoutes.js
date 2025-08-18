import express from "express";
import {
  createParcel,
  getAllParcels,
  getParcelById,
  updateParcel,
  deleteParcel,
} from "../controllers/parcelController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", createParcel); // Create a new parcel
router.get("/", getAllParcels); // Get all parcels
router.get("/:id", getParcelById); // Get parcel by ID
router.put("/:id", updateParcel); // Update parcel
router.delete("/:id", deleteParcel); // Delete parcel

export default router;
