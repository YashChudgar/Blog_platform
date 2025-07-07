// routes/likeRoutes.js
import express from "express";
import { toggleLike, getLikeStatus } from "../controllers/likeController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/:postId", protect, toggleLike);
router.get("/:postId", protect, getLikeStatus);

export default router;
