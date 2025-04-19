// server/routes/idea.routes.js
import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import {
    createIdea,
    getUserIdeas,
    getIdea,
    updateIdea,
    deleteIdea,
} from "../controllers/idea.controller.js";

const router = express.Router();

router.post("/create", verifyToken, createIdea); // Create new idea
router.get("/all", verifyToken, getUserIdeas); // Get all ideas for user
router.get("/:id", verifyToken, getIdea); // Get single idea
router.put("/:id", verifyToken, updateIdea); // Update idea
router.delete("/:id", verifyToken, deleteIdea); // Delete idea

export default router;
