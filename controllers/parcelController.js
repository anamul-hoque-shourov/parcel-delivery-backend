import Parcel from "../models/parcelModel.js";

// Create a new parcel order
export const createParcel = async (req, res) => {
  try {
    const parcel = new Parcel({
      ...req.body,
      sender: req.user._id, // assuming user is authenticated and attached to req
    });
    const savedParcel = await parcel.save();
    res.status(201).json(savedParcel);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all parcels (admin/merchant)
export const getAllParcels = async (req, res) => {
  try {
    const parcels = await Parcel.find().populate("sender assignedRider merchant");
    res.json(parcels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single parcel by ID
export const getParcelById = async (req, res) => {
  try {
    const parcel = await Parcel.findById(req.params.id).populate("sender assignedRider merchant");
    if (!parcel) return res.status(404).json({ message: "Parcel not found" });
    res.json(parcel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update parcel status or details
export const updateParcel = async (req, res) => {
  try {
    const updatedParcel = await Parcel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedParcel) return res.status(404).json({ message: "Parcel not found" });
    res.json(updatedParcel);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a parcel
export const deleteParcel = async (req, res) => {
  try {
    const deletedParcel = await Parcel.findByIdAndDelete(req.params.id);
    if (!deletedParcel) return res.status(404).json({ message: "Parcel not found" });
    res.json({ message: "Parcel deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};