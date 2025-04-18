import mongoose, { Schema } from "mongoose";

const pitchSchema = new mongoose.Schema(
    {
        founderName: {
            type: String,
            required: true,
        },
        startupName: {
            type: String,
            required: true,
        },
        tagline: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        sector: {
            type: String,
            required: true,
        },
        stage: {
            type: String,
            enum: ["Idea", "Prototype", "Early Revenue", "Scaling"],
            required: true,
        },
        location: {
            type: String,
            default: "India",
        },
        askAmount: {
            type: Number,
            required: true,
        },
        askEquity: {
            type: Number,
            required: true,
        },
        companyValuation: {
            type: Number,
            required: true,
        },
        revenue: {
            type: Number,
            default: 0,
        },
        profitMargin: {
            type: Number,
            default: 0,
        },
        pitchVideoUrl: {
            type: String,
            default: "",
        },
        website: {
            type: String,
            default: "",
        },
        socialLinks: {
            type: [String],
            default: [],
        },
        founderEmail: {
            type: String,
            required: true,
        },
        founderProfileImage: {
            type: String,
            default: "",
        },
        teamSize: {
            type: Number,
            default: 1,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

const Pitch = mongoose.model("Pitch", pitchSchema);
export default Pitch;
