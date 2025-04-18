import { Router } from "express";
import { createUser, checkUser } from "../controllers/user.controller.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = Router();

router.post("/verify-token", verifyToken, createUser);
router.get("/check/:uid", verifyToken, checkUser);


export default router;
