import { Request, Response } from "express";
import Parcel from "@/schemas/parcelSchema";

export async function createParcel(req: Request, res: Response): Promise<void> {
  try {
    const { sender, receiver, deliveryAddress } = req.body;

    const parcel = new Parcel({
      sender,
      receiver,
      deliveryAddress,
    });

    const savedParcel = await parcel.save();
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
    const parcels = await Parcel.find();
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
    const parcel = await Parcel.findById(req.params.id);
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
    const updatedParcel = await Parcel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
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
    const deletedParcel = await Parcel.findByIdAndDelete(req.params.id);
    if (!deletedParcel) {
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
