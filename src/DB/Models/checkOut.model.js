import mongoose from "mongoose";
import { Schema, model, Types } from "mongoose";

const CheckOutSchema = new Schema({

    userId: { type: Types.ObjectId, ref: "User", required: true },
    products: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true }
        }
    ],
    billingAddress: {
        firstName: String,
        lastName: String,
        email: String,
        mobileNo: String,
        address1: String,
        address2: String,
        country: String,
        city: String,
        paymentMethod: {
            type: String,
            enum: ["Cash on Delivery", "Credit Card", "InstaPay"], // شيلي المسافة اللي قبل InstaPay
            default: "Cash on Delivery"
        },
        totalPrice: { type: Number, required: true }
    },
    status: { type: String, enum: ["Pending", "Shipped", "Delivered", "Cancelled"], default: "Pending" },
}, { timestamps: true })




const CheckOutModel = model("CheckOut", CheckOutSchema);

export default CheckOutModel;