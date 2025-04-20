import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://krishmakadiya2005:FJ0GPifq4d1agU3z@cluster.2wtffmg.mongodb.net/LaunchPad");
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1); 
    }
};

export default connectDB;
