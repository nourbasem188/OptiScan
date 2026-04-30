import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const ProductSchema = new Schema({

    name: String,

    description: String,

    price: Number,

    category: String,


    stock: Number,

    salesCount: Number
}, {
    timestamps: true
})

const ProductModel = model("Product", ProductSchema)

export default ProductModel;