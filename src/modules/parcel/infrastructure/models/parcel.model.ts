import { Schema, Document, Types } from 'mongoose';
import { ParcelStatus } from '@/modules/parcel/domain/parcel.entity';

export interface IParcelModel extends Document {
  _id: Types.ObjectId;
  sender: string;
  receiver: string;
  deliveryAddress: string;
  status: ParcelStatus;
  creatorId: string;
  creatorRole: 'merchant' | 'user';
  riderId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const ParcelSchema = new Schema<IParcelModel>(
  {
    sender: {
      type: String,
      required: true,
      trim: true,
    },
    receiver: {
      type: String,
      required: true,
      trim: true,
    },
    deliveryAddress: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ['pending', 'in_transit', 'delivered', 'cancelled'],
      default: 'pending',
    },
    creatorId: {
      type: String,
      required: true,
      index: true,
    },
    creatorRole: {
      type: String,
      enum: ['merchant', 'user'],
      required: true,
    },
    riderId: {
      type: String,
      sparse: true,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);
