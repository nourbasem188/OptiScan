import mongoose from "mongoose";
import dotenv from "dotenv";


dotenv.config();
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Failed to connect to MongoDB", error);
    }
}



export default connectDB;