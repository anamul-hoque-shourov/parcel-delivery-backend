import express from "express";
import {
  createParcel,
  getParcels,
  getParcel,
  updateParcel,
  deleteParcel,
  getRiderTasks,
  updateParcelStatus,
} from "@/api/controllers/parcel_controller";
import { authenticateToken } from "../middlewares/auth_middleware";

const router = express.Router();

router.post("/", createParcel);
router.get("/", getParcels);
router.get("/:id", getParcel);
router.put("/:id", updateParcel);
router.delete("/:id", deleteParcel);

router.get("/owner", )

router.get("/rider/tasks", authenticateToken, getRiderTasks);
router.patch("/rider/tasks/:id/status", authenticateToken, updateParcelStatus);

export default router;
