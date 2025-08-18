import Parcel from "../models/parcelModel.js";

// Get all parcels created by the merchant
export const getMerchantParcels = async (req, res) => {
  try {
    const parcels = await Parcel.find({ merchant: req.user._id });
    res.status(200).json(parcels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a parcel by ID created by the merchant
export const getMerchantParcelById = async (req, res) => {
  try {
    const parcel = await Parcel.findOne({
      _id: req.params.id,
      merchant: req.user._id,
    });
    if (!parcel) return res.status(404).json({ message: "Parcel not found" });
    res.status(200).json(parcel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a parcel created by the merchant
export const updateMerchantParcel = async (req, res) => {
  try {
    const parcel = await Parcel.findOneAndUpdate(
      { _id: req.params.id, merchant: req.user._id },
      req.body,
      { new: true }
    );
    if (!parcel) return res.status(404).json({ message: "Parcel not found" });
    res.status(200).json({ message: "Parcel updated successfully", parcel });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a parcel created by the merchant
export const deleteMerchantParcel = async (req, res) => {
  try {
    const parcel = await Parcel.findOneAndDelete({
      _id: req.params.id,
      merchant: req.user._id,
    });
    if (!parcel) return res.status(404).json({ message: "Parcel not found" });
    res.status(200).json({ message: "Parcel deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
