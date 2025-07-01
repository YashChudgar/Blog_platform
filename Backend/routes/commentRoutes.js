import express from "express";
import { addComment, deleteComment } from "../controllers/commentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/:postId", protect, addComment);
router.delete("/:commentId", protect, deleteComment);

export default router;
