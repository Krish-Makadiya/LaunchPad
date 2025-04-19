import { Router } from "express";
import { createPitch, deletePitch, editPitch, getAllOtherPitches, getAllPitches, getuserPitch, getUserPitches } from "../controllers/startup.controller.js";
import verifyToken from "../middlewares/verifyToken.js";


const router = Router();

router.post("/create-pitch", verifyToken, createPitch);
router.put("/edit-pitch/:id", verifyToken, editPitch);
router.get("/get-user-pitches", verifyToken, getUserPitches);
router.get("/get-other-pitches", verifyToken, getAllOtherPitches);
router.delete('/delete-pitch/:id', verifyToken, deletePitch);
router.get('/pitch/:pitchId', verifyToken, getuserPitch);
router.get('/pitches', verifyToken, getAllPitches);

export default router;