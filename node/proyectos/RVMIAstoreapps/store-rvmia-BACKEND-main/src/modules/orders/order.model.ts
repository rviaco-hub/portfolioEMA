import { Schema, model } from "mongoose";

const OrderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },

  items: [
    {
      product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true }
    }
  ],

  total: Number,

  status: {
    type: String,
    enum: ["pending", "paid", "cancelled"],
    default: "pending"
  },

  paymentId: String
}, { timestamps: true });

export const Order = model("Order", OrderSchema);