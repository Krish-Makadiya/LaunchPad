import { Router } from "express";
import {
    createRating,
    getPitchRatings,
    getUserRatings,
} from "../controllers/rating.controller.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = Router();

router.post("/create-rating/:pitchId", verifyToken, createRating);
router.get("/get-pitch-ratings/:pitchId", verifyToken, getPitchRatings);
router.get("/get-user-ratings", verifyToken, getUserRatings);

export default router;
