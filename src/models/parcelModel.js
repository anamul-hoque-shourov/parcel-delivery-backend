import mongoose from "mongoose";

const parcelSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    recipientName: {
      type: String,
      required: true,
    },
    recipientPhone: {
      type: String,
      required: true,
    },
    pickupAddress: {
      type: String,
      required: true,
    },
    deliveryAddress: {
      type: String,
      required: true,
    },
    parcelDescription: {
      type: String,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "picked", "in_transit", "delivered", "cancelled"],
      default: "pending",
    },
    assignedRider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    deliveryFee: {
      type: Number,
      required: true,
    },
    merchant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Parcel = mongoose.model("Parcel", parcelSchema);

export default Parcel;
