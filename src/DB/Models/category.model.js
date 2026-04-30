import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const CategorySchema = new Schema({

    name:{type:String,required:true,unique:true},

    description: String,

    image: String,
},{
    timestamps: true
})

const CategoryModel = model("Category", CategorySchema)

export default CategoryModel;