import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema(
    {
        pitch: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Pitch",
            required: true,
            index: true,
        },
        investor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        rating: {
            type: Number,
            required: true,
            min: [1, "Rating must be at least 1"],
            max: [5, "Rating cannot exceed 5"],
            validate: {
                validator: Number.isInteger,
                message: "Rating must be a whole number",
            },
        },
    },
    { timestamps: true }
);

ratingSchema.index({ pitch: 1, investor: 1 }, { unique: true });

const Rating = mongoose.model("Rating", ratingSchema);
export default Rating;
