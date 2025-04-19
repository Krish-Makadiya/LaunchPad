import admin from "../config/firebaseAdmin.js";
import User from "../models/User.model.js";

export const createUser = async (req, res) => {
    const { uid, email, name, picture } = req.user;
    const { userRole } = req.body;

    if (!uid || !email || !userRole) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const newUser = await User.create({
            firebaseUID: uid,
            email,
            name,
            profileImage: picture || null,
            role: userRole,
        });

        return res.status(201).json(newUser);
    } catch (error) {
        return res.status(500).json({ message: "Error creating user", error });
    }
};

export const checkUser = async (req, res) => {
    try {
        const { uid } = req.params;

        const decodedToken = await admin
            .auth()
            .verifyIdToken(req.headers.authorization.split("Bearer ")[1]);

        if (decodedToken.uid !== uid) {
            return res.status(403).json({ error: "Unauthorized" });
        }

        const user = await User.findOne({ firebaseUID: uid });

        if (user) {
            res.json({
                exists: true,
                role: user.role,
            });
        } else {
            res.json({
                exists: false,
            });
        }
    } catch (error) {
        console.error("Error checking user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const userProfile = async (req, res) => {
    try {
        // Get user ID from middleware
        const userId = req.user.uid;
        console.log(req.user);

        // Find user and populate based on role
        const user = await User.findOne({ firebaseUID: userId });
        console.log(user);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Prepare response based on user role
        const userResponse = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            profileImage: user.profileImage,
            isVerified: user.isVerified,
            createdAt: user.createdAt,
            lastActive: user.lastActive,
        };

        return res.status(200).json({
            success: true,
            message: "User profile fetched successfully",
            user: userResponse,
        });
    } catch (error) {
        console.error("Error in userProfile:", error);
        return res.status(500).json({
            success: false,
            message: "Error fetching user profile",
            error: error.message,
        });
    }
};
