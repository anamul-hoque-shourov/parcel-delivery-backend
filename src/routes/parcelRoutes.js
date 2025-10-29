import express from "express";
import {
  createParcel,
  getParcels,
  getParcel,
  updateParcel,
  deleteParcel,
} from "../controllers/parcelController.js";

const router = express.Router();

router.post("/", createParcel);
router.get("/", getParcels);
router.get("/:id", getParcel);
router.put("/:id", updateParcel);
router.delete("/:id", deleteParcel);

export default router;
