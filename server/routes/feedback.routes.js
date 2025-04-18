import { Router } from "express";
import {
    createFeedback,
    getPitchFeedback,
    deleteFeedback,
    getUserFeedback,
} from "../controllers/feedback.controller.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = Router();

router.post("/create-feedback/:pitchId", verifyToken, createFeedback);
router.get("/get-pitch-feedback/:pitchId", verifyToken, getPitchFeedback);
router.delete("/delete-feedback/:feedbackId", verifyToken, deleteFeedback);
router.get("/get-user-feedback", verifyToken, getUserFeedback);

export default router;
