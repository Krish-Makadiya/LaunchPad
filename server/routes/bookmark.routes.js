import { Router } from "express";
import {
    addBookmark,
    removeBookmark,
    getUserBookmarks,
    getBookmarkStats,
    getPitchBookmarkStats,
} from "../controllers/bookmark.controller.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = Router();

router.post("/create-bookmark/:pitchId", verifyToken, addBookmark);
router.delete("/remove-bookmark/:pitchId", verifyToken, removeBookmark);
router.get("/get-user-bookmark-stats", verifyToken, getBookmarkStats);
router.get("/get-pitch-bookmark-stats", verifyToken, getPitchBookmarkStats);

export default router;
