import Parcel from "../models/parcelModel.js";

export const getAssignedParcels = async (req, res) => {
  try {
    const parcels = await Parcel.find({ assignedRider: req.user._id });
    res.json(parcels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateParcelStatus = async (req, res) => {
  try {
    const parcel = await Parcel.findOneAndUpdate(
      { _id: req.params.id, assignedRider: req.user._id },
      { status: req.body.status },
      { new: true }
    );
    if (!parcel) return res.status(404).json({ message: "Parcel not found" });
    res.json(parcel);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};