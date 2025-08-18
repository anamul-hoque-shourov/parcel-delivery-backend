import express from "express";
import {
  authMiddleware,
  authorizeRoles,
} from "../middlewares/authMiddleware.js";
import {
  getAssignedParcels,
  updateParcelStatus,
} from "../controllers/riderController.js";

const router = express.Router();

router.use(authMiddleware, authorizeRoles("rider"));

router.get("/assigned-parcels", getAssignedParcels);
router.put("/parcels/:id/status", updateParcelStatus);

export default router;
