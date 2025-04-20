import { Router } from "express";
import { createUser, checkUser, userProfile, getInterestedInvestors } from "../controllers/user.controller.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = Router();

router.post("/verify-token", verifyToken, createUser);
router.get("/check/:uid", verifyToken, checkUser);
router.get('/profile', verifyToken, userProfile);
router.get('/get-intrested-investors', verifyToken, getInterestedInvestors);



export default router;
