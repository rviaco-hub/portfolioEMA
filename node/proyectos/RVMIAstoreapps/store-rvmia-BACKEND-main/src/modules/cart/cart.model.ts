import { Schema, model } from "mongoose";

const CartSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },

    items: [
        {
            product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
            name: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true }
        }
    ]
}, { timestamps: true });

export const Cart = model("Cart", CartSchema);