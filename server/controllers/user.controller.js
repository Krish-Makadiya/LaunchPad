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
