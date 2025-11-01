import mongoose, { Document, Model, Schema } from "mongoose";

export interface IParcelModel extends Document {
  sender: string;
  receiver: string;
  deliveryAddress: string;
  status: string;
}

const ParcelSchema: Schema<IParcelModel> = new Schema(
  {
    sender: { type: String, required: true },
    receiver: { type: String, required: true },
    deliveryAddress: { type: String, required: true },
    status: {
      type: String,
      enum: ["PENDING", "IN_TRANSIT", "DELIVERED", "CANCELLED"],
      default: "PENDING",
      required: true,
    },
  },
  { timestamps: true }
);

export const ParcelModel: Model<IParcelModel> = mongoose.model<IParcelModel>(
  "Parcel",
  ParcelSchema
);
