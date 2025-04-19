import Idea from "../models/idea.model.js";
import mongoose from "mongoose";

// Create a new idea
export const createIdea = async (req, res) => {
    try {
        const { title, description, category, priority } = req.body;
        const userId = req.user.uid

        // Basic validation
        if (!title || !description || !category) {
            return res.status(400).json({
                success: false,
                message: "Title, description, and category are required",
            });
        }

        const idea = await Idea.create({
            title,
            description,
            category,
            priority: priority || "Medium",
            createdBy: userId,
        });

        console.log(idea);
        return res.status(201).json({
            success: true,
            message: "Idea created successfully",
            idea,
        });
    } catch (error) {
        console.error("Error in createIdea:", error);
        return res.status(500).json({
            success: false,
            message: "Error creating idea",
            error: error.message,
        });
    }
};

// Get all ideas for a user
export const getUserIdeas = async (req, res) => {
    try {
        // Debug the incoming user object
        console.log("Incoming user object:", req.user);

        // Get uid from req.user and convert to ObjectId
        const userId = req.user.uid

        const ideas = await Idea.find({createdBy: userId})
            .sort({ createdAt: -1 })
            .populate("createdBy", "name email");

        return res.status(200).json({
            success: true,
            count: ideas.length,
            ideas,
        });
    } catch (error) {
        console.error("Error in getUserIdeas:", error);

        // Handle specific MongoDB errors
        if (error instanceof mongoose.Error.CastError) {
            return res.status(400).json({
                success: false,
                message: "Invalid user ID format",
                details: `Unable to convert ${req.user.uid} to ObjectId`,
            });
        }

        return res.status(500).json({
            success: false,
            message: "Error fetching ideas",
            error: error.message,
        });
    }
};

// Get single idea
export const getIdea = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid idea ID",
            });
        }

        const idea = await Idea.findOne({
            _id: id,
            createdBy: userId,
        });

        if (!idea) {
            return res.status(404).json({
                success: false,
                message: "Idea not found or access denied",
            });
        }

        return res.status(200).json({
            success: true,
            idea,
        });
    } catch (error) {
        console.error("Error in getIdea:", error);
        return res.status(500).json({
            success: false,
            message: "Error fetching idea",
            error: error.message,
        });
    }
};

// Update idea
export const updateIdea = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.uid;
        const { title, description, category, status, priority } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid idea ID",
            });
        }

        // Check if idea exists and belongs to user
        const existingIdea = await Idea.findOne({
            _id: id,
            createdBy: userId,
        });

        if (!existingIdea) {
            return res.status(404).json({
                success: false,
                message: "Idea not found or access denied",
            });
        }

        // Update idea
        const updatedIdea = await Idea.findByIdAndUpdate(
            id,
            {
                title: title || existingIdea.title,
                description: description || existingIdea.description,
                category: category || existingIdea.category,
                status: status || existingIdea.status,
                priority: priority || existingIdea.priority,
            },
            { new: true, runValidators: true }
        );

        return res.status(200).json({
            success: true,
            message: "Idea updated successfully",
            idea: updatedIdea,
        });
    } catch (error) {
        console.error("Error in updateIdea:", error);
        return res.status(500).json({
            success: false,
            message: "Error updating idea",
            error: error.message,
        });
    }
};

// Delete idea
export const deleteIdea = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.uid;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid idea ID",
            });
        }

        const idea = await Idea.findOneAndDelete({
            _id: id,
            createdBy: userId,
        });

        if (!idea) {
            return res.status(404).json({
                success: false,
                message: "Idea not found or access denied",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Idea deleted successfully",
        });
    } catch (error) {
        console.error("Error in deleteIdea:", error);
        return res.status(500).json({
            success: false,
            message: "Error deleting idea",
            error: error.message,
        });
    }
};
