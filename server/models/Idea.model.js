// server/models/idea.model.js
import mongoose from "mongoose";

const ideaSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
            minLength: [3, "Title must be at least 3 characters long"],
            maxLength: [100, "Title cannot exceed 100 characters"],
        },
        description: {
            type: String,
            required: [true, "Description is required"],
            trim: true,
            minLength: [10, "Description must be at least 10 characters long"],
            maxLength: [2000, "Description cannot exceed 2000 characters"],
        },
        category: {
            type: String,
            required: [true, "Category is required"],
            enum: [
                "Technology",
                "Healthcare",
                "Education",
                "Finance",
                "E-commerce",
                "Social Impact",
                "Environment",
                "Other",
            ],
        },
        priority: {
            type: String,
            enum: ["Low", "Medium", "High"],
            default: "Medium",
        },
        createdBy: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

// Add indexes for better query performance
ideaSchema.index({ createdBy: 1, status: 1 });
ideaSchema.index({ title: "text", description: "text" });

const Idea = mongoose.model("Idea", ideaSchema);
export default Idea;
