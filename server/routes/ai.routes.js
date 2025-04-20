import { Router } from "express";
import { getResultController } from "../controllers/ai.controller.js";

const router = Router();

router.get("/generate-feedback", getResultController);

export default router;
