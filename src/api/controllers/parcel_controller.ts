import { Request, Response } from "express";
import { ParcelService } from "@/application/services/parcel_services";

const parcelService = new ParcelService();

export async function createParcel(req: Request, res: Response): Promise<void> {
  try {
    const { sender, receiver, deliveryAddress } = req.body;

    const savedParcel = await parcelService.createParcel({
      sender,
      receiver,
      deliveryAddress,
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

export async function updateParcel(req: Request, res: Response): Promise<void> {
  try {
    const updatedParcel = await parcelService.updateParcel(
      req.params.id,
      req.body
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
