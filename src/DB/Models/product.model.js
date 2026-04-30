import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const ProductSchema = new Schema({

    name: { type: String, required: true },

    description: String,

    price: { type: Number, required: true },

    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },

    shape: { type: String, enum: ["Round", "Square", "Rectangle", "Oval", 'cat-eye', 'aviator'] },

    color: String,

    material: String,

    image: { type: String, required: true },

    stock: { type: Number, required: true, default: 0, min: 0 },
}, {
    timestamps: true
})

const ProductModel = model("Product", ProductSchema)

export default ProductModel;