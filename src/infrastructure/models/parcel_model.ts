import mongoose, { Document, Model, Schema } from "mongoose";

export interface IParcelModel extends Document {
  sender: string;
  receiver: string;
  deliveryAddress: string;
  status: string;
  riderId?: Schema.Types.ObjectId;
}

const ParcelSchema: Schema<IParcelModel> = new Schema(
  {
    sender: { type: String, required: true },
    receiver: { type: String, required: true },
    deliveryAddress: { type: String, required: true },
    status: { type: String, required: true, default: "pending" },
    riderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
      index: true,
    },
  },
  { timestamps: true }
);

export const ParcelModel: Model<IParcelModel> = mongoose.model<IParcelModel>(
  "Parcel",
  ParcelSchema
);
