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

export const getBookmarkStats = async (req, res) => {
    try {
        const userId = req.user.id;

        // 1. Get all pitches created by the user
        const userPitches = await Pitch.find({ userId: userId }).select('_id');

        // If user has no pitches, return 0
        if (!userPitches.length) {
            return res.status(200).json({
                success: true,
                totalBookmarks: 0,
                message: "No pitches found for this user"
            });
        }

        // 2. Get pitch IDs
        const pitchIds = userPitches.map(pitch => pitch._id);

        // 3. Count total bookmarks for all user's pitches combined
        const totalBookmarks = await Bookmark.countDocuments({
            pitchId: { $in: pitchIds }
        });

        return res.status(200).json({
            success: true,
            totalBookmarks
        });

    } catch (error) {
        console.error('Error in getSimpleBookmarkStats:', error);
        return res.status(500).json({
            success: false,
            message: 'Error fetching bookmark count',
            error: error.message
        });
    }
};

// Get bookmarks for a specific pitch
export const getPitchBookmarkStats = async (req, res) => {
    try {
        const { pitchId } = req.params;
        const userId = req.user.id;

        // Verify pitch ownership
        const pitch = await Pitch.findOne({
            _id: pitchId,
            userId: userId
        });

        if (!pitch) {
            return res.status(404).json({
                success: false,
                message: "Pitch not found or unauthorized"
            });
        }

        // Get bookmark statistics for the specific pitch
        const bookmarkStats = await Bookmark.aggregate([
            {
                $match: {
                    pitchId: new mongoose.Types.ObjectId(pitchId)
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'investorDetails'
                }
            },
            {
                $group: {
                    _id: '$pitchId',
                    totalBookmarks: { $sum: 1 },
                    investors: {
                        $push: {
                            investor: { $arrayElemAt: ['$investorDetails', 0] },
                            bookmarkedAt: '$createdAt'
                        }
                    }
                }
            },
            {
                $project: {
                    totalBookmarks: 1,
                    investors: {
                        $map: {
                            input: '$investors',
                            as: 'inv',
                            in: {
                                _id: '$$inv.investor._id',
                                name: '$$inv.investor.name',
                                email: '$$inv.investor.email',
                                bookmarkedAt: '$$inv.bookmarkedAt'
                            }
                        }
                    },
                    lastBookmarked: { $max: '$investors.bookmarkedAt' }
                }
            }
        ]);

        return res.status(200).json({
            success: true,
            pitchTitle: pitch.title,
            bookmarkStats: bookmarkStats[0] || {
                totalBookmarks: 0,
                investors: [],
                lastBookmarked: null
            }
        });

    } catch (error) {
        console.error('Error in getPitchBookmarkStats:', error);
        return res.status(500).json({
            success: false,
            message: 'Error fetching pitch bookmark statistics',
            error: error.message
        });
    }
};