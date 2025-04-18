import mongoose from "mongoose";
import Pitch from "../models/Pitch.model.js";
import User from "../models/User.model.js";

// Create pitch
export const createPitch = async (req, res) => {
    try {
        const userId = req.user.uid;

        const user = await User.findOne({ firebaseUID: userId });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        if (user.role !== "startup") {
            return res.status(403).json({
                success: false,
                message: "Only startups can create pitches",
            });
        }

        const {
            founderName,
            startupName,
            tagline,
            description,
            sector,
            stage,
            location,
            askAmount,
            askEquity,
            companyValuation,
            revenue,
            profitMargin,
            pitchVideoUrl,
            website,
            socialLinks,
            founderEmail,
            founderProfileImage,
            teamSize,
        } = req.body;

        if (
            !founderName ||
            !startupName ||
            !tagline ||
            !description ||
            !sector ||
            !stage ||
            !askAmount ||
            !askEquity ||
            !companyValuation ||
            !founderEmail
        ) {
            return res.status(400).json({
                success: false,
                message: "All required fields must be provided",
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(founderEmail)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format",
            });
        }

        if (askAmount <= 0) {
            return res.status(400).json({
                success: false,
                message: "Ask amount must be greater than 0",
            });
        }

        if (askEquity <= 0 || askEquity > 100) {
            return res.status(400).json({
                success: false,
                message: "Equity percentage must be between 0 and 100",
            });
        }

        if (companyValuation <= 0) {
            return res.status(400).json({
                success: false,
                message: "Company valuation must be greater than 0",
            });
        }

        const newPitch = await Pitch.create({
            founderName,
            startupName,
            tagline,
            description,
            sector,
            stage,
            location: location || "India",
            askAmount,
            askEquity,
            companyValuation,
            revenue: revenue || 0,
            profitMargin: profitMargin || 0,
            pitchVideoUrl: pitchVideoUrl || "",
            website: website || "",
            socialLinks: socialLinks || [],
            founderEmail,
            founderProfileImage: founderProfileImage || "",
            teamSize: teamSize || 1,
            createdBy: user._id,
        });

        await newPitch.populate("createdBy", "name email");

        return res.status(201).json({
            success: true,
            message: "Pitch created successfully",
            pitch: newPitch,
        });
    } catch (error) {
        console.error("Error creating pitch:", error);
        return res.status(500).json({
            success: false,
            message: "Error creating pitch",
            error: error.message,
        });
    }
};

// Edit a pitch
export const editPitch = async (req, res) => {
    try {
        const pitchId = req.params.id;
        const userId = req.user.uid;

        const user = await User.findOne({ firebaseUID: userId });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        if (user.role !== "startup") {
            return res.status(403).json({
                success: false,
                message: "Only startups can edit pitches",
            });
        }

        const existingPitch = await Pitch.findById(pitchId).populate(
            "createdBy"
        );
        if (!existingPitch) {
            return res.status(404).json({
                success: false,
                message: "Pitch not found",
            });
        }

        if (existingPitch.createdBy._id.toString() !== user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized: You can only edit your own pitches",
            });
        }

        const {
            founderName,
            startupName,
            tagline,
            description,
            sector,
            stage,
            location,
            askAmount,
            askEquity,
            companyValuation,
            revenue,
            profitMargin,
            pitchVideoUrl,
            website,
            socialLinks,
            founderEmail,
            founderProfileImage,
            teamSize,
        } = req.body;

        const updateData = {};

        if (founderName !== undefined) updateData.founderName = founderName;
        if (startupName !== undefined) updateData.startupName = startupName;
        if (tagline !== undefined) updateData.tagline = tagline;
        if (description !== undefined) updateData.description = description;
        if (sector !== undefined) updateData.sector = sector;
        if (stage !== undefined) {
            if (
                !["Idea", "Prototype", "Early Revenue", "Scaling"].includes(
                    stage
                )
            ) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid stage value",
                });
            }
            updateData.stage = stage;
        }
        if (location !== undefined) updateData.location = location;
        if (askAmount !== undefined) {
            if (askAmount <= 0) {
                return res.status(400).json({
                    success: false,
                    message: "Ask amount must be greater than 0",
                });
            }
            updateData.askAmount = askAmount;
        }
        if (askEquity !== undefined) {
            if (askEquity <= 0 || askEquity > 100) {
                return res.status(400).json({
                    success: false,
                    message: "Equity percentage must be between 0 and 100",
                });
            }
            updateData.askEquity = askEquity;
        }
        if (companyValuation !== undefined) {
            if (companyValuation <= 0) {
                return res.status(400).json({
                    success: false,
                    message: "Company valuation must be greater than 0",
                });
            }
            updateData.companyValuation = companyValuation;
        }
        if (revenue !== undefined) updateData.revenue = revenue;
        if (profitMargin !== undefined) updateData.profitMargin = profitMargin;
        if (pitchVideoUrl !== undefined)
            updateData.pitchVideoUrl = pitchVideoUrl;
        if (website !== undefined) updateData.website = website;
        if (socialLinks !== undefined) updateData.socialLinks = socialLinks;
        if (founderEmail !== undefined) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(founderEmail)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid email format",
                });
            }
            updateData.founderEmail = founderEmail;
        }
        if (founderProfileImage !== undefined)
            updateData.founderProfileImage = founderProfileImage;
        if (teamSize !== undefined) {
            if (teamSize < 1) {
                return res.status(400).json({
                    success: false,
                    message: "Team size must be at least 1",
                });
            }
            updateData.teamSize = teamSize;
        }

        const updatedPitch = await Pitch.findByIdAndUpdate(
            pitchId,
            { $set: updateData },
            {
                new: true,
                runValidators: true,
            }
        ).populate("createdBy", "name email");

        return res.status(200).json({
            success: true,
            message: "Pitch updated successfully",
            pitch: updatedPitch,
        });
    } catch (error) {
        console.error("Error updating pitch:", error);
        return res.status(500).json({
            success: false,
            message: "Error updating pitch",
            error: error.message,
        });
    }
};

// Get user pitches
export const getUserPitches = async (req, res) => {
    try {
        const userId = req.user.uid;

        const user = await User.findOne({ firebaseUID: userId });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        if (user.role !== "startup") {
            return res.status(403).json({
                success: false,
                message: "Only startups can view their pitches",
            });
        }

        const pitches = await Pitch.find({ createdBy: user._id })
            .populate("createdBy", "name email")
            .sort({ createdAt: -1 }); // Sort by newest first

        return res.status(200).json({
            success: true,
            message: "Pitches retrieved successfully",
            count: pitches.length,
            pitches,
        });
    } catch (error) {
        console.error("Error fetching user pitches:", error);
        return res.status(500).json({
            success: false,
            message: "Error fetching pitches",
            error: error.message,
        });
    }
};

// Get all other pitches than user
export const getAllOtherPitches = async (req, res) => {
    try {
        const userId = req.user.uid; // Firebase UID from auth middleware

        // Find the current user and validate
        const currentUser = await User.findOne({ firebaseUID: userId });
        if (!currentUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Check if user is a startup
        if (currentUser.role !== "startup") {
            return res.status(403).json({
                success: false,
                message:
                    "Access denied: Only startup users can view other pitches",
            });
        }

        // Get all pitches except current user's, sorted by newest first
        const pitches = await Pitch.find({
            createdBy: { $ne: currentUser._id }, // Exclude current user's pitches
        })
            .populate("createdBy", "name email profileImage") // Include creator's basic info
            .sort({ createdAt: -1 }); // Newest first

        return res.status(200).json({
            success: true,
            message: "Pitches retrieved successfully",
            count: pitches.length,
            pitches,
        });
    } catch (error) {
        console.error("Error fetching pitches:", error);
        return res.status(500).json({
            success: false,
            message: "Error fetching pitches",
            error: error.message,
        });
    }
};

// Delete pitch
export const deletePitch = async (req, res) => {
    try {
        const pitchId = req.params.id;
        const userId = req.user.uid;

        if (!pitchId) {
            return res.status(400).json({
                success: false,
                message: "Pitch ID is required",
            });
        }

        const currentUser = await User.findOne({ firebaseUID: userId });
        if (!currentUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        if (currentUser.role !== "startup") {
            return res.status(403).json({
                success: false,
                message: "Access denied: Only startup users can delete pitches",
            });
        }

        const pitch = await Pitch.findById(pitchId);

        if (!pitch) {
            return res.status(404).json({
                success: false,
                message: "Pitch not found",
            });
        }

        if (pitch.createdBy.toString() !== currentUser._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "Access denied: You can only delete your own pitches",
            });
        }

        await Pitch.findByIdAndDelete(pitchId);

        return res.status(200).json({
            success: true,
            message: "Pitch deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting pitch:", error);

        if (error.name === "CastError") {
            return res.status(400).json({
                success: false,
                message: "Invalid pitch ID format",
            });
        }

        return res.status(500).json({
            success: false,
            message: "Error deleting pitch",
            error: error.message,
        });
    }
};

export const getuserPitch = async (req, res) => {
    try {
        const { pitchId } = req.params; // Get pitch ID from URL params
        const userId = req.user.id; // Get user ID from auth middleware

        // Validate pitch ID format
        if (!mongoose.Types.ObjectId.isValid(pitchId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid pitch ID format",
            });
        }

        // Find pitch and populate necessary fields
        const pitch = await Pitch.findOne({
            _id: pitchId,
            // createdBy: userId
        }).populate([
            {
                path: "createdBy",
                select: "name email profileImage", // Only select needed fields
            }
        ]);

        // Check if pitch exists
        if (!pitch) {
            return res.status(404).json({
                success: false,
                message:
                    "Pitch not found or you don't have permission to view it",
            });
        }

        // Calculate additional statistics
        const stats = {
            totalBookmarks: pitch.bookmarks?.length || 0,
            totalRatings: pitch.ratings?.length || 0,
            averageRating:
                pitch.ratings?.length > 0
                    ? (
                          pitch.ratings.reduce(
                              (acc, curr) => acc + curr.rating,
                              0
                          ) / pitch.ratings.length
                      ).toFixed(1)
                    : 0,
            totalFeedback: pitch.feedback?.length || 0,
        };

        return res.status(200).json({
            success: true,
            pitch: {
                ...pitch.toObject(),
                stats,
            },
        });
    } catch (error) {
        console.error("Error in getuserPitch:", error);
        return res.status(500).json({
            success: false,
            message: "Error fetching pitch details",
            error: error.message,
        });
    }
};
