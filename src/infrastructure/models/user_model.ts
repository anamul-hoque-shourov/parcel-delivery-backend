import mongoose, { Document, Model, Schema } from "mongoose";

export interface IUserModel extends Document {
  username: string;
  email: string;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema<IUserModel> = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export const UserModel: Model<IUserModel> = mongoose.model<IUserModel>(
  "User",
  UserSchema
);
