import mongoose from "mongoose";
import {Schema,model,Types} from "mongoose";

const CartSchema = new Schema({
    userId: { type: Types.ObjectId, ref: "User", required: true, unique: true },
    products: [{
        productId: { type: Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true, default: 1, min: 1 }
    }],
    totalPrice: { type: Number, default: 0, min: 0 }
}, { timestamps: true })

const CartModel = model("Cart", CartSchema);

export default CartModel;