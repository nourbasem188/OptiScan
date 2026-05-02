import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const UserSchema = new Schema({

    name: String,

    email: { type: String, unique: true },

    password: String,

    phone: Number,
    
    gender: { type: String, enum: ["Male", "Female"] },

    age: Number,

    role: { 
        type: String, 
        enum: ['User', 'Admin'], 
        default: 'User' 
    }

}, {
    timestamps: true
})


const UserModel = model("User", UserSchema);

export default UserModel;