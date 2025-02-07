
import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log("Database connection successful");
    } catch (error) {
        console.error("Database connection failed:", error);
    }
};

export default connectDB;
