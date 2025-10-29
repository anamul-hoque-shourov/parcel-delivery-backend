import mongoose from "mongoose";

const parcelSchema = new mongoose.Schema(
  {
    sender: {
      type: String,
      required: true,
    },
    receiver: {
      type: String,
      required: true,
    },
    deliveryAddress: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Parcel = mongoose.model("Parcel", parcelSchema);

export default Parcel;
