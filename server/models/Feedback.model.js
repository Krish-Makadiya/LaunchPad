import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
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
        content: {
            type: String,
            required: true,
            trim: true,
            minlength: [10, "Feedback must be at least 10 characters long"],
            maxlength: [1000, "Feedback cannot exceed 1000 characters"],
        },
        sentiment: {
            type: String,
            enum: ["positive", "negative", "neutral"],
            default: "neutral",
        },
    },
    { timestamps: true }
);

feedbackSchema.index({ pitch: 1, investor: 1 }, { unique: true });

const Feedback = mongoose.model("Feedback", feedbackSchema);
export default Feedback;
