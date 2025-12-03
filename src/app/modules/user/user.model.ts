import mongoose, { model, Schema } from "mongoose";
import { IAuthProvider, IUser, Role } from "./user.interface";

const authProviderSchema = new Schema<IAuthProvider>(
  {
    provider: { type: String, required: true },
    providerId: { type: String, required: true },
  },
  { _id: false, versionKey: false }
);

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },

    password: { type: String, default: null },
    role: {
      type: String,
      required: true,
      enum: Object.values(Role),
      default: Role.USER,
    },
    phone: { type: String, default: null },
    profilePicture: { type: String, default: null },
    location: { type: String, default: null },

    auths: { type: [authProviderSchema], required: true },
  },
  { timestamps: true, versionKey: false }
);

export const User = model<IUser>("User", userSchema);
