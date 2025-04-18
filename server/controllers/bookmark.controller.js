import Bookmark from "../models/Bookmark.model.js";
import User from "../models/User.model.js";
import Pitch from "../models/Pitch.model.js";

// Add bookmark
export const addBookmark = async (req, res) => {
    try {
        const { pitchId } = req.params;
        const userId = req.user.uid;

        if (!pitchId) {
            return res.status(400).json({
                success: false,
                message: "Pitch ID is required",
            });
        }

        const user = await User.findOne({ firebaseUID: userId });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        if (user.role !== "investor") {
            return res.status(403).json({
                success: false,
                message: "Only investors can bookmark pitches",
            });
        }

        const pitch = await Pitch.findById(pitchId);
        if (!pitch) {
            return res.status(404).json({
                success: false,
                message: "Pitch not found",
            });
        }

        if (pitch.createdBy.toString() === user._id.toString()) {
            return res.status(400).json({
                success: false,
                message: "You cannot bookmark your own pitch",
            });
        }

        const existingBookmark = await Bookmark.findOne({
            pitch: pitchId,
            investor: user._id,
        });

        if (existingBookmark) {
            return res.status(400).json({
                success: false,
                message: "You have already bookmarked this pitch",
            });
        }

        const newBookmark = await Bookmark.create({
            pitch: pitchId,
            investor: user._id,
        });

        const bookmarkCount = await Bookmark.countDocuments({ pitch: pitchId });

        await newBookmark.populate([
            {
                path: "pitch",
                select: "startupName tagline",
            },
            {
                path: "investor",
                select: "name email",
            },
        ]);

        return res.status(201).json({
            success: true,
            message: "Pitch bookmarked successfully",
            data: {
                bookmark: newBookmark,
                bookmarkCount,
            },
        });
    } catch (error) {
        console.error("Error adding bookmark:", error);

        if (error.name === "CastError") {
            return res.status(400).json({
                success: false,
                message: "Invalid pitch ID format",
            });
        }

        return res.status(500).json({
            success: false,
            message: "Error adding bookmark",
            error: error.message,
        });
    }
};

// Remove bookmark
export const removeBookmark = async (req, res) => {
    try {
        const { pitchId } = req.params;
        const userId = req.user.uid;

        const user = await User.findOne({ firebaseUID: userId });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        if (user.role !== "investor") {
            return res.status(403).json({
                success: false,
                message: "Only investors can manage bookmarks",
            });
        }

        const removedBookmark = await Bookmark.findOneAndDelete({
            pitch: pitchId,
            investor: user._id,
        });

        if (!removedBookmark) {
            return res.status(404).json({
                success: false,
                message: "Bookmark not found",
            });
        }

        const bookmarkCount = await Bookmark.countDocuments({ pitch: pitchId });

        return res.status(200).json({
            success: true,
            message: "Bookmark removed successfully",
            bookmarkCount,
        });
    } catch (error) {
        console.error("Error removing bookmark:", error);
        return res.status(500).json({
            success: false,
            message: "Error removing bookmark",
            error: error.message,
        });
    }
};

// Get user's bookmarks
export const getUserBookmarks = async (req, res) => {
    try {
        const userId = req.user.uid;

        const user = await User.findOne({ firebaseUID: userId });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        if (user.role !== "investor") {
            return res.status(403).json({
                success: false,
                message: "Only investors can view bookmarks",
            });
        }

        const bookmarks = await Bookmark.find({ investor: user._id })
            .populate({
                path: "pitch",
                select: "startupName tagline description sector stage askAmount askEquity",
            })
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            message: "Bookmarks fetched successfully",
            data: {
                count: bookmarks.length,
                bookmarks,
            },
        });
    } catch (error) {
        console.error("Error fetching bookmarks:", error);
        return res.status(500).json({
            success: false,
            message: "Error fetching bookmarks",
            error: error.message,
        });
    }
};