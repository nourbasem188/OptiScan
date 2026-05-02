import mongoose from "mongoose";
import { Schema,model } from "mongoose";

const Admin = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // طبعاً بنعملها Hash بعدين
    role: { type: String, default: 'user' }
});

export default Admin;