import Feedback from "../models/Feedback.model.js";
import User from "../models/User.model.js";
import Pitch from "../models/Pitch.model.js";


// Create feedback
export const createFeedback = async (req, res) => {
    try {
        const { pitchId } = req.params;
        const { content } = req.body;
        const userId = req.user.uid;

        if (!content || content.trim().length < 10) {
            return res.status(400).json({
                success: false,
                message: "Feedback content must be at least 10 characters long"
            });
        }

        const user = await User.findOne({ firebaseUID: userId });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (user.role !== "investor") {
            return res.status(403).json({
                success: false,
                message: "Only investors can provide feedback"
            });
        }

        const pitch = await Pitch.findById(pitchId);
        if (!pitch) {
            return res.status(404).json({
                success: false,
                message: "Pitch not found"
            });
        }

        if (pitch.createdBy.toString() === user._id.toString()) {
            return res.status(400).json({
                success: false,
                message: "You cannot give feedback on your own pitch"
            });
        }

        const existingFeedback = await Feedback.findOne({
            pitch: pitchId,
            investor: user._id
        });

        if (existingFeedback) {
            return res.status(400).json({
                success: false,
                message: "You have already provided feedback for this pitch"
            });
        }

        const newFeedback = await Feedback.create({
            pitch: pitchId,
            investor: user._id,
            content: content.trim()
        });

        await newFeedback.populate('investor', 'name email');

        return res.status(201).json({
            success: true,
            message: "Feedback submitted successfully",
            feedback: newFeedback
        });

    } catch (error) {
        console.error("Error creating feedback:", error);
        return res.status(500).json({
            success: false,
            message: "Error submitting feedback",
            error: error.message
        });
    }
};

// Get pitch feedback
export const getPitchFeedback = async (req, res) => {
    try {
        const { pitchId } = req.params;
        const userId = req.user.uid;

        const user = await User.findOne({ firebaseUID: userId });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const pitch = await Pitch.findById(pitchId);
        if (!pitch) {
            return res.status(404).json({
                success: false,
                message: "Pitch not found"
            });
        }

        const feedback = await Feedback.find({ pitch: pitchId })
            .populate('investor', 'name email')
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            message: "Feedback retrieved successfully",
            data: {
                count: feedback.length,
                feedback
            }
        });

    } catch (error) {
        console.error("Error fetching feedback:", error);
        return res.status(500).json({
            success: false,
            message: "Error fetching feedback",
            error: error.message
        });
    }
};

// Delete feedback
export const deleteFeedback = async (req, res) => {
    try {
        const { feedbackId } = req.params;
        const userId = req.user.uid;

        const user = await User.findOne({ firebaseUID: userId });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const feedback = await Feedback.findById(feedbackId);
        if (!feedback) {
            return res.status(404).json({
                success: false,
                message: "Feedback not found"
            });
        }

        if (feedback.investor.toString() !== user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You can only delete your own feedback"
            });
        }

        await Feedback.deleteOne({ _id: feedbackId });

        return res.status(200).json({
            success: true,
            message: "Feedback deleted successfully"
        });

    } catch (error) {
        console.error("Error deleting feedback:", error);
        return res.status(500).json({
            success: false,
            message: "Error deleting feedback",
            error: error.message
        });
    }
};

// Get user's given feedback
export const getUserFeedback = async (req, res) => {
    try {
        const userId = req.user.uid;

        const user = await User.findOne({ firebaseUID: userId });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (user.role !== "investor") {
            return res.status(403).json({
                success: false,
                message: "Only investors can view their feedback"
            });
        }

        const feedback = await Feedback.find({ investor: user._id })
            .populate({
                path: 'pitch investor',
                select: 'founderName stage location askAmount  askEquity companyValuation founderEmail startupName tagline email profileImage name role'
            })
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            message: "User feedback retrieved successfully",
            data: {
                count: feedback.length,
                feedback
            }
        });

    } catch (error) {
        console.error("Error fetching user feedback:", error);
        return res.status(500).json({
            success: false,
            message: "Error fetching user feedback",
            error: error.message
        });
    }
};