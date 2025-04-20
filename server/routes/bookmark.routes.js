import { Router } from "express";
import {
    addBookmark,
    removeBookmark,
    getUserBookmarks,
    getBookmarkStats,
    getPitchBookmarkStats,
    getTotalBookmarks,
} from "../controllers/bookmark.controller.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = Router();

router.post("/create-bookmark/:pitchId", verifyToken, addBookmark);
router.delete("/remove-bookmark/:pitchId", verifyToken, removeBookmark);
router.get("/get-user-bookmarks", verifyToken, getUserBookmarks);
router.get("/get-user-bookmark-stats", verifyToken, getBookmarkStats);
router.get("/get-pitch-bookmark-stats", verifyToken, getPitchBookmarkStats);
router.get("/get-total-bookmarks", verifyToken, getTotalBookmarks);

export default router;
