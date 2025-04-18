import { Router } from "express";
import {
    addBookmark,
    removeBookmark,
    getUserBookmarks,
} from "../controllers/bookmark.controller.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = Router();

router.post("/create-bookmark/:pitchId", verifyToken, addBookmark);
router.delete("/remove-bookmark/:pitchId", verifyToken, removeBookmark);
router.get("/get-user-bookmarks", verifyToken, getUserBookmarks);

export default router;
