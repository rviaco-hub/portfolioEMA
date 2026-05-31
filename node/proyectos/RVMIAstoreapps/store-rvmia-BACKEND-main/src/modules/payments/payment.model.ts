import { Schema, model } from "mongoose";

const PaymentSchema = new Schema(
  {
    order: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: true,
      index: true,
    },

    provider: {
      type: String,
      required: true,
      default: "wompi",
    },

    status: {
      type: String,
      required: true,
      enum: [
        "pending",
        "approved",
        "declined",
        "error",
        "voided",
      ],
      default: "pending",
      index: true,
    },

    reference: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    transactionId: {
      type: String,
      default: null,
      index: true,
    },

    amountInCents: {
      type: Number,
      required: true,
    },

    currency: {
      type: String,
      required: true,
      default: "COP",
    },

    processedAt: {
      type: Date,
      default: null,
    },

    webhookValidated: {
      type: Boolean,
      default: false,
    },

    raw: {
      type: Schema.Types.Mixed,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Payment", PaymentSchema);