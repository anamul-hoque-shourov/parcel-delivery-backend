import express from "express";
import {
  getMerchantParcels,
  getMerchantParcelById,
  updateMerchantParcel,
  deleteMerchantParcel,
} from "../controllers/merchantController.js";
import {
  authMiddleware,
  authorizeRoles,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware, authorizeRoles("merchant"));

router.get("/parcels", getMerchantParcels); // Get all parcels for merchant
router.get("/parcels/:id", getMerchantParcelById); // Get single parcel by ID
router.put("/parcels/:id", updateMerchantParcel); // Update parcel
router.delete("/parcels/:id", deleteMerchantParcel); // Delete parcel

export default router;
