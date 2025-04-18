import Rating from "../models/Rating.model.js";
import User from "../models/User.model.js";
import Pitch from "../models/Pitch.model.js";


// Create or update rating
export const createRating = async (req, res) => {
    try {
        const { pitchId } = req.params;
        const { rating } = req.body;
        const userId = req.user.uid;

        if (!rating || !Number.isInteger(rating) || rating < 1 || rating > 5) {
            return res.status(400).json({
                success: false,
                message: "Rating must be a whole number between 1 and 5",
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
                message: "Only investors can rate pitches",
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
                message: "You cannot rate your own pitch",
            });
        }

        const updatedRating = await Rating.findOneAndUpdate(
            { pitch: pitchId, investor: user._id },
            { rating },
            {
                new: true,
                upsert: true,
                runValidators: true,
            }
        );

        const ratingStats = await Rating.aggregate([
            { $match: { pitch: pitch._id } },
            {
                $group: {
                    _id: null,
                    averageRating: { $avg: "$rating" },
                    totalRatings: { $sum: 1 },
                },
            },
        ]);

        return res.status(200).json({
            success: true,
            message: "Rating submitted successfully",
            data: {
                rating: updatedRating,
                stats: {
                    averageRating: ratingStats[0]?.averageRating || rating,
                    totalRatings: ratingStats[0]?.totalRatings || 1,
                },
            },
        });
    } catch (error) {
        console.error("Error submitting rating:", error);
        return res.status(500).json({
            success: false,
            message: "Error submitting rating",
            error: error.message,
        });
    }
};

// Get pitch ratings
export const getPitchRatings = async (req, res) => {
    try {
        const { pitchId } = req.params;

        const pitch = await Pitch.findById(pitchId);
        if (!pitch) {
            return res.status(404).json({
                success: false,
                message: "Pitch not found",
            });
        }

        const ratingStats = await Rating.aggregate([
            { $match: { pitch: pitch._id } },
            {
                $group: {
                    _id: null,
                    averageRating: { $avg: "$rating" },
                    totalRatings: { $sum: 1 },
                    ratingDistribution: {
                        $push: "$rating",
                    },
                },
            },
            {
                $project: {
                    _id: 0,
                    averageRating: { $round: ["$averageRating", 1] },
                    totalRatings: 1,
                    ratingDistribution: {
                        1: {
                            $size: {
                                $filter: {
                                    input: "$ratingDistribution",
                                    cond: { $eq: ["$$this", 1] },
                                },
                            },
                        },
                        2: {
                            $size: {
                                $filter: {
                                    input: "$ratingDistribution",
                                    cond: { $eq: ["$$this", 2] },
                                },
                            },
                        },
                        3: {
                            $size: {
                                $filter: {
                                    input: "$ratingDistribution",
                                    cond: { $eq: ["$$this", 3] },
                                },
                            },
                        },
                        4: {
                            $size: {
                                $filter: {
                                    input: "$ratingDistribution",
                                    cond: { $eq: ["$$this", 4] },
                                },
                            },
                        },
                        5: {
                            $size: {
                                $filter: {
                                    input: "$ratingDistribution",
                                    cond: { $eq: ["$$this", 5] },
                                },
                            },
                        },
                    },
                },
            },
        ]);

        return res.status(200).json({
            success: true,
            data: ratingStats[0] || {
                averageRating: 0,
                totalRatings: 0,
                ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
            },
        });
    } catch (error) {
        console.error("Error fetching ratings:", error);
        return res.status(500).json({
            success: false,
            message: "Error fetching ratings",
            error: error.message,
        });
    }
};

// Get user's given ratings
export const getUserRatings = async (req, res) => {
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
                message: "Only investors can view their ratings",
            });
        }

        const ratings = await Rating.find({ investor: user._id })
            .populate({
                path: "pitch",
                select: "startupName tagline",
            })
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            data: {
                count: ratings.length,
                ratings,
            },
        });
    } catch (error) {
        console.error("Error fetching user ratings:", error);
        return res.status(500).json({
            success: false,
            message: "Error fetching user ratings",
            error: error.message,
        });
    }
};
