import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema(
    {
        investor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        pitch: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Pitch",
            required: true,
            index: true,
        },
        bookmarkedAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

bookmarkSchema.index({ investor: 1, pitch: 1 }, { unique: true });

const Bookmark = mongoose.model("Bookmark", bookmarkSchema);
export default Bookmark;
