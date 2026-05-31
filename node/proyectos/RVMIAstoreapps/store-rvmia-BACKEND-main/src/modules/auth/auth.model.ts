import { Schema, model } from "mongoose";

export type UserRole = "buyer" | "provider" | "admin";

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },

    role: {
      type: String,
      enum: ["buyer", "provider", "admin"],
      default: "buyer"
    },

    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const User = model("User", UserSchema);