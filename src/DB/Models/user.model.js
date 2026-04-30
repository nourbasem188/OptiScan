import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const UserSchema = new Schema({

    name: String,

    email: { type: String, unique: true },

    password: String,

    phone: Number,
    
    gender: { type: String, enum: ["Male", "Female"] },

    age: Number

}, {
    timestamps: true
})


const UserModel = model("User", UserSchema);

export default UserModel;