import { Request, Response } from "express";
import { ParcelService } from "@/application/services/parcel_services";
import { AuthenticatedRequest } from "@/api/middlewares/auth_middleware";

const parcelService = new ParcelService();

export async function createParcel(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  try {
    const creatorId = req.user?.id;
    const creatorRole = req.user?.role as "merchant" | "user";

    if (!creatorId || !creatorRole) {
      res
        .status(401)
        .json({ message: "Authentication required and user role is missing." });
      return;
    }

    const { sender, receiver, deliveryAddress } = req.body;

    const savedParcel = await parcelService.createParcel({
      sender,
      receiver,
      deliveryAddress,
      creatorId,
      creatorRole,
    });

    res.status(201).json(savedParcel);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: "Unknown error occurred" });
    }
  }
}

export async function getParcels(req: Request, res: Response): Promise<void> {
  try {
    const parcels = await parcelService.getAllParcels();
    res.json(parcels);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
}

export async function getParcel(req: Request, res: Response): Promise<void> {
  try {
    const parcel = await parcelService.getParcelById(req.params.id);

    if (!parcel) {
      res.status(404).json({ message: "Parcel not found" });
      return;
    }
    res.json(parcel);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
}

export async function updateParcel(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  try {
    const updatedParcel = await parcelService.updateParcel(
      req.params.id,
      req.body,
      req.user?.id
    );

    if (!updatedParcel) {
      res.status(404).json({ message: "Parcel not found" });
      return;
    }

    res.json(updatedParcel);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: "Unknown error occurred" });
    }
  }
}

export async function deleteParcel(req: Request, res: Response): Promise<void> {
  try {
    const success = await parcelService.deleteParcel(req.params.id);

    if (!success) {
      res.status(404).json({ message: "Parcel not found" });
      return;
    }
    res.json({ message: "Parcel deleted successfully" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
}

export async function getRiderTasks(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  try {
    const riderId = req.user?.id;
    if (req.user?.role !== "rider") {
      res.status(403).json({ message: "Access denied. Requires Rider role." });
      return;
    }

    const parcels = await parcelService.getRiderParcels(riderId!);
    res.json(parcels);
  } catch (error) {
    // ... (error handling)
  }
}

// --- NEW: Rider Update Status ---
export async function updateParcelStatus(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  try {
    const riderId = req.user?.id;
    const parcelId = req.params.id;
    const { status: newStatus } = req.body;

    if (req.user?.role !== "rider") {
      res.status(403).json({ message: "Access denied. Requires Rider role." });
      return;
    }

    // Basic validation on the status
    if (
      !newStatus ||
      (newStatus !== "in_transit" && newStatus !== "delivered")
    ) {
      res.status(400).json({
        message:
          "Invalid status update. Only 'in_transit' or 'delivered' allowed.",
      });
      return;
    }

    const updatedParcel = await parcelService.updateParcelStatusByRider(
      parcelId,
      newStatus,
      riderId!
    );

    if (!updatedParcel) {
      res
        .status(404)
        .json({ message: "Parcel not found or not assigned to you." });
      return;
    }

    res.json(updatedParcel);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message }); // Catch service errors like invalid transition
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
