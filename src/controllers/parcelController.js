import Parcel from "../models/parcelModel.js";

export const createParcel = async (req, res) => {
  try {
    const { sender, receiver, deliveryAddress } = req.body;
    const parcel = new Parcel({
      sender,
      receiver,
      deliveryAddress,
    });
    const savedParcel = await parcel.save();
    res.status(201).json(savedParcel);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getParcels = async (req, res) => {
  try {
    const parcels = await Parcel.find();
    res.json(parcels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getParcel = async (req, res) => {
  try {
    const parcel = await Parcel.findById(req.params.id);
    if (!parcel) return res.status(404).json({ message: "Parcel not found" });
    res.json(parcel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateParcel = async (req, res) => {
  try {
    const updatedParcel = await Parcel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedParcel)
      return res.status(404).json({ message: "Parcel not found" });
    res.json(updatedParcel);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteParcel = async (req, res) => {
  try {
    const deletedParcel = await Parcel.findByIdAndDelete(req.params.id);
    if (!deletedParcel)
      return res.status(404).json({ message: "Parcel not found" });
    res.json({ message: "Parcel deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
